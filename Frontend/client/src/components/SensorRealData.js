import React from 'react'
import  '../css/SensorTable.css'
import socketIO from "socket.io-client"

class SensorRealData extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
        };
        
    }

        componentWillMount(){
            const socket = socketIO.connect('http://localhost:8000', {path:"/data"})
            socket.on('getFullDataFromApi', dataInformation => this.setState({data:dataInformation})) 
        }

        render(){
            const {data} = this.state
            return(
                <div className="container">
                <table id="sensorList">
                  <thead>
                    <tr>
                    <th>SensorId</th>
                    <th>SensorTemperature</th>
                    <th>SensorHumidity</th>
                    <th>ReadingTime</th>
                    </tr>
                  </thead>
                    {data.map(sensor =>
                  <tbody key= {sensor.sensor_id}>
                    <tr>
                    <td>{sensor.sensor_id}</td>
                    <td>{sensor.temperature}</td>
                    <td>{sensor.humidity}</td>
                    <td>{sensor.reading_time}</td>
                    </tr>
                  </tbody>
                )}
                </table>
              </div>
            );
        }
}
export default SensorRealData;