require('dotenv').config();

const tmi = require('tmi.js');
const { Sequelize, DataTypes } = require('sequelize');

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: process.env.BOT_NICKNAME,
        password: process.env.TMI_TOKEN,
    },
    channels: ['crimpsonsloper'],
});

client.connect()

const sequelize = new Sequelize(
    process.env.AWS_DB_NAME,
    process.env.AWS_DB_USERNAME,
    process.env.AWS_DB_PASSWORD,
    {
        host: process.env.AWS_DB_HOST,
        dialect: 'mysql'
    }
);

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Stream = sequelize.define('stream', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

const CheckIn = sequelize.define('checkin', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    streamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

User.hasMany(Stream, {
    foreignKey: 'userId'
});
Stream.belongsTo(User);

Stream.hasMany(CheckIn, {
    foreignKey: 'streamId'
});
CheckIn.belongsTo(Stream);

User.hasMany(CheckIn, {
    foreignKey: 'userId'
});
CheckIn.belongsTo(User);

sequelize.sync()

// Stream.create({ userId: 1 })


client.on('message', async (channel, userstate, message, self) => {
    if (self) return;

    if (message.includes('test')) {
        const user = await User.findOne({
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

async function checkAttendance(user, channel) {
    const currentStream = await Stream.findOne({
        where: {
            userId: channel.id,
            isLive: true,
        },
    });

    if (!currentStream) {
        return;
    }

    try {
        const existingAttendance = await CheckIn.findOne({
            where: {
                streamId: currentStream.id,
                userId: user.id,
            },
        });

        if (!existingAttendance) {
            const lastStream = await Stream.findOne({
                where: {
                    userId: channel.id,
                    isLive: false,
                },
                order: [['id', 'DESC']],
            });
            const existingStreak = await CheckIn.findOne({
                where: {
                    streamId: lastStream.id,
                    userId: user.id,
                },
            });
            let streak = 0;
            if (existingStreak) {
                streak = existingStreak.streak + 1;
            }
            await CheckIn.create({
                streamId: currentStream.id,
                userId: user.id,
                streak: streak
            });

            client.say(channel.username, `you've been marked present for today's stream!`);
        } else {
            client.say(channel.username, `you've already been marked present for today.`);
        }

    } catch (error) {
        console.error('Error checking/adding attendance:', error);
    }
}

