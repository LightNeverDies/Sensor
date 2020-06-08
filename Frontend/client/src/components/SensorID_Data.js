import React from 'react'
import '../css/SensorTable.css'


class SensorID_Data extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
        };
    }

    componentDidMount(){
        fetch(`http://192.168.1.4:8000/sensors/${this.props.id}/data`)
        .then(response => response.json())
        .then(data => this.setState({ data }));
      }

      render() {
        const {data} = this.state;
        return (
          <div className="container">
            <table id="sensorList">
              <thead>
                <tr>
                <th>SensorName</th>
                <th>SensorTemperature</th>
                <th>SensorHumidity</th>
                <th>ReadingTime</th>
                </tr>
              </thead>
                {data.map(sensor =>
              <tbody key= {sensor.sensor_id}>
                <tr>
                <td>{sensor.sensor_name}</td>
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
export default SensorID_Data