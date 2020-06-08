const app = require('express')();
const http = require('http').createServer(app)
const path_routes = require('./routes/path_routes')
const db = require('./db');
const io = require('socket.io')
var cors = require('cors')
const socket = io(http, { path: '/test'})
const webSocket = io(http, { path: '/data'})

const port = process.env.port || 8000;

app.use(cors())
app.use('/', path_routes)
app.use('/id',path_routes)



socket.sockets.on('connection', (socket) =>{
    console.log(`A new Sensor has connected [${socket.id}]!`);

    socket.on("new-sensor", function(data) {

        socket.sensorId     = data.sensorId;
        
        const sensorId     = data.sensorId;
        const sensorName   = data.sensorName;
        const sensorStatus = data.sensorStatus;

        db.Sensor.create({
            sensor_id: sensorId,
            sensor_name: sensorName,
            sensor_status: sensorStatus,
        }).then(() =>{
            console.log("A New Sensor has been added to the database!");
        })
    });

    socket.on("new_sensor_reading", (data) => { 
        const sensorId     = data.sensorId;
        const sensorTemp   = data.sensorTemp;
        const sensorHumi   = data.sensorHumi;
        const readingTime  = data.readingTime;

        db.SensorReading.create({
            temperature: sensorTemp,
            humidity: sensorHumi,
            reading_time: readingTime,
            sensor_id: sensorId,
        }).then(() =>{
            console.log("A New Sensor-Reading has been added to the database!");
        })
    })


    socket.on("disconnect", () => {
        console.log(`A Sensor has disconnected [${socket.id}]!`);

        db.Sensor.update({sensor_status: 0}, {where: {sensor_id: socket.sensorId}}).then(()=>{
            console.log("A Sensor's status has been updated!");
        })
    })

})


webSocket.sockets.on('connection', (socket) => {
    console.log("A Web-User has connected with ID of: " + socket.id)

     db.Sensor.findAll({raw:true}).then(function(data){socket.emit('getDataFromApi', data)})

     db.SensorReading.findAll({raw:true}).then(function(data){socket.emit('getFullDataFromApi',data)})

    socket.on("disconnect", () => {
        console.log('A Web-User has disconnected with ID of: '+ socket.id)
    })    
})


http.listen(port, ()=> console.log(`Listening on port ${port}....`))
 