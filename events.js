
const { config } = require('./config');
const axios = require('axios');

const SubEvents = {
    "channel.update": {
        "type": "channel.update",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.follow": {
        "type": "channel.follow",
        "version": "2",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id,
            "moderator_user_id": config.broadcaster_id
        }
    },
    "channel.subscribe": {
        "type": "channel.subscribe",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.subscription.end": {
        "type": "channel.subscription.end",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.subscription.gift": {
        "type": "channel.subscription.gift",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.subscription.message": {
        "type": "channel.subscription.message",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.cheer": {
        "type": "channel.cheer",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.raid": {
        "type": "channel.raid",
        "version": "1",
        "condition": {
            "to_broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.ban": {
        "type": "channel.ban",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.unban": {
        "type": "channel.unban",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.moderator.add": {
        "type": "channel.moderator.add",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.moderator.remove": {
        "type": "channel.moderator.remove",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.channel_points_custom_reward.add": {
        "type": "channel.channel_points_custom_reward.add",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.channel_points_custom_reward.update": {
        "type": "channel.channel_points_custom_reward.update",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.channel_points_custom_reward.remove": {
        "type": "channel.channel_points_custom_reward.remove",
        "version": "1",
        "condition":
        {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.channel_points_custom_reward_redemption.add": {
        "type": "channel.channel_points_custom_reward_redemption.add",
        "version": "1",
        "condition":
        {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.channel_points_custom_reward_redemption.update": {
        "type": "channel.channel_points_custom_reward_redemption.update",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.poll.begin": {
        "type": "channel.poll.begin",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.poll.progress": {
        "type": "channel.poll.progress",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.poll.end": {
        "type": "channel.poll.end",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.prediction.begin": {
        "type": "channel.prediction.begin",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.prediction.progress": {
        "type": "channel.prediction.progress",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.prediction.lock": {
        "type": "channel.prediction.lock",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.prediction.end": {
        "type": "channel.prediction.end",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "drop.entitlement.grant": {
        "type": "drop.entitlement.grant",
        "version": "1",
        "condition": {
            "organization_id": config.broadcaster_id // Not sure if value is correct
        },
        "is_batching_enabled": true
    },
    "extension.bits_transaction.create": {
        "type": "extension.bits_transaction.create",
        "version": "1",
        "condition": {
            "extension_client_id": config.broadcaster_id // Not sure if value is correct
        }
    },
    "channel.goal.begin": {
        "type": "channel.goal.begin",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.goal.progress": {
        "type": "channel.goal.progress",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.goal.end": {
        "type": "channel.goal.end",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.hype_train.begin": {
        "type": "channel.hype_train.begin",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.hype_train.progress": {
        "type": "channel.hype_train.progress",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.hype_train.end": {
        "type": "channel.hype_train.end",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "stream.online": {
        "type": "stream.online",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "stream.offline": {
        "type": "stream.offline",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "user.authorization.grant": {
        "type": "user.authorization.grant",
        "version": "1",
        "condition": {
            "client_id": config.broadcaster_id // Not sure if value is correct
        }
    },
    "user.authorization.revoke": {
        "type": "user.authorization.revoke",
        "version": "1",
        "condition": {
            "client_id": config.broadcaster_id // Not sure if value is correct
        }
    },
    "user.update": {
        "type": "user.update",
        "version": "1",
        "condition": {
            "user_id": config.broadcaster_id
        }
    },
    "channel.charity_campaign.donate": {
        "type": "channel.charity_campaign.donate",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.charity_campaign.start": {
        "type": "channel.charity_campaign.start",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.charity_campaign.progress": {
        "type": "channel.charity_campaign.progress",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.charity_campaign.stop": {
        "type": "channel.charity_campaign.stop",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id
        }
    },
    "channel.shield_mode.begin": {
        "type": "channel.shield_mode.begin",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id,
            "moderator_user_id": config.broadcaster_id
        }
    },
    "channel.shield_mode.end": {
        "type": "channel.shield_mode.end",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id,
            "moderator_user_id": config.broadcaster_id
        }
    },
    "channel.shoutout.create": {
        "type": "channel.shoutout.create",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id,
            "moderator_user_id": config.broadcaster_id
        }
    },
    "channel.shoutout.receive": {
        "type": "channel.shoutout.receive",
        "version": "1",
        "condition": {
            "broadcaster_user_id": config.broadcaster_id,
            "moderator_user_id": config.broadcaster_id
        }
    }
};

async function subscribeToEvents(events, websocketSessionId, access_token) {
    for (const event of events) {
        try {
            const requestBody = {
                ...SubEvents[event],
                transport: {
                    method: 'websocket',
                    session_id: websocketSessionId,
                },
            };

            const headers = {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': config.CLIENT_ID,
                'Content-Type': 'application/json',
            };
            const response = await axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', requestBody, {
                headers: headers,
            });
            console.log(`Subscription to ${event} event created`);

        } catch (error) {
            console.log(`Subscription to ${event} event created: `, error);
        }
    }
}

module.exports = {
    subscribeToEvents
}