const tmi = require('tmi.js');
const WebSocket = require('ws');
const { Sequelize } = require('sequelize');

const { User, Stream, CheckIn } = require('./db.js');
const { config } = require('./config');
const { checkAttendance } = require('./utils');
const { subscribeToEvents } = require('./events.js');

const socket = new WebSocket('wss://eventsub.wss.twitch.tv/ws?keepalive_timeout_seconds=100');
const ACCESS_TOKEN = "4aouctmbkmkk8d3h8zqizilju0uyd0"

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: config.identity,
    channels: [],
});

client.on('connected', async () => {
    const channels = await User.findAll({
        where: {
            role: { [Sequelize.Op.gt]: 0 },
        },
        attributes: ['username'],
    });

    for (const username of channels) {
        if (!client.channels.includes(username.username)) {
            try {
                await client.join(username.username);
            } catch (error) {
                console.error(`Error joining channel ${username.username}:`, error);
            }
        }
    }
})

client.on('message', async (channel, userstate, message, self) => {
    if (self) return;

    if (message.includes('!board')) {
        const [user] = await User.findOrCreate({
            where: {
                username: userstate.username,
            },
        });
        const streamer = await User.findOne({
            where: {
                username: channel.substring(1),
            },
        });
        checkAttendance(user, streamer)
    }
});

client.connect().catch((err) => {
    console.log(err)
})

socket.on('open', async function () {
    socket.on('message', async function (data) {
        const message = JSON.parse(data);

        if (message.metadata && message.metadata.message_type) {
            const messageType = message.metadata.message_type;

            switch (messageType) {
                case 'session_welcome':
                    const sessionId = message.payload.session.id;
                    console.log(sessionId)
                    subscribeToEvents(["stream.online", "stream.offline"], sessionId, ACCESS_TOKEN);
                    break;

                case 'notification':
                    const notificationType = message.payload.subscription.type;
                    const username = message.payload.event.broadcaster_user_login;

                    const user = await User.findOne({ where: { username: username } })
                    switch (notificationType) {
                        case 'stream.offline':
                            const stream = await Stream.findOne({ where: { userId: user.id, isLive: true } });
                            stream.isLive = false;
                            await stream.save();
                            break;

                        case 'stream.online':
                            await Stream.create({ userId: user.id })
                            break;

                        default:
                            console.log('Received a message with unknown type:', notificationType);
                    }

                    break;

                case 'session_keepalive':
                    console.log('Received keep-alive message');
                    break;

                case 'reconnect':
                    console.log('Received reconnect message:', message);
                    break;

                case 'revocation':
                    console.log('Received revocation message:', message);
                    break;

                case 'close':
                    console.log('Received close message:', message);
                    break;

                default:
                    console.log('Received a message with unknown type:', messageType);
            }
        }
    });
});

socket.on('error', function (error) {
    console.error('WebSocket error:', error);
});

socket.on('close', function () {
    console.log('WebSocket connection closed');
});

