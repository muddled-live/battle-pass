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



const crimps = User.create({ username: "Nate" })
    .then((data) => {
        const crimps_stream = CheckIn.create({ userId: data.id, streamId: 1 });
    })

