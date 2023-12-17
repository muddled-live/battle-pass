const { config } = require('./config');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    config.DATABASE.NAME,
    config.DATABASE.USERNAME,
    config.DATABASE.PASSWORD,
    {
        host: config.DATABASE.HOST,
        dialect: 'mysql'
    }
);

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    twitch_id: {
        type: DataTypes.INTEGER,
    },
    access_token: {
        type: DataTypes.STRING,
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

module.exports = {
    User,
    CheckIn,
    Stream
}