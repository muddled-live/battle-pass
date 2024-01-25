const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const User = require('./users')(sequelize, Sequelize);
const CheckIn = require('./checkins')(sequelize, Sequelize);
const Stream = require('./streams')(sequelize, Sequelize);
const Message = require('./messages')(sequelize, Sequelize);

async function forceSyncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

module.exports = {
    User,
    Video,
    sequelize,
    forceSyncDatabase
};