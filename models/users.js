const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['username']
                }
            ]
        },
    );
    return User;
}