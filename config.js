require('dotenv').config()

const config = {
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.TMI_TOKEN,
    },
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    DATABASE: {
        USERNAME: "root",
        PASSWORD: "root",
        NAME: "BattlePass",
        HOST: "localhost"
    },
    broadcaster_id: "144328956"
};

module.exports = {
    config
}