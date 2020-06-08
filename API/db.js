let Sequelize = require('sequelize');

const sequelize = new Sequelize('sensor', 'username', 'password', {
    dialect:'sqlite',
    storage: './database/sensor.db',
    pool: {
        max:5,
        min:0,
        acquire:60000,
        idle:10000
    },
    logging: false
});

var db = {
    sequelize: sequelize,
    sequelize: Sequelize,
    Sensor: sequelize.import('./models/sensor'),
    SensorReading: sequelize.import('./models/sensor_reading')
};

module.exports = db;