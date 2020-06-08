const express = require('express')
const router = express.Router();

const db = require('../db');

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

router.get('/sensors', (req,res) =>{ 
    db.Sensor.findAll({raw:true}).then(function(sensor){res.status(200).send(sensor)})
});

router.get('/sensors/:id', (req,res) =>{
    var id = req.params.id;
    db.Sensor.findAll({raw:true, where:{sensor_id: id}}).then(function(sensor){res.status(200).send(sensor)})
   
});

router.put('/sensors/:id',(req,res)=>{
    var id = req.params.id;
    sequelize.query(`UPDATE sensor SET sensor_status = (CASE WHEN sensor_status = 1 THEN 0 WHEN sensor_status = 0 THEN 1 END) WHERE sensor_id = ${id}`).then(function(result){res.status(200).send(result[0])})
})

router.get('/sensors/:id/data', (req,res) =>{
    var id = req.params.id;
    sequelize.query(`SELECT sensor.sensor_name, sensor_reading.temperature, sensor_reading.humidity, sensor_reading.reading_time FROM sensor inner join sensor_reading on sensor_reading.sensor_id = sensor.sensor_id WHERE sensor_reading.sensor_id = ${id}`).then(function(result){
        res.status(200).send(result[0])}
    )
})

module.exports = router;