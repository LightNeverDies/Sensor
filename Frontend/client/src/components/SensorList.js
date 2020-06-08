import React from 'react'
import '../css/SensorTable.css'
import SensorID from '../components/SensorID'


class SensorList extends React.Component{
    constructor(props){
    super(props);
    this.state = {
      data:[],
      currentId:[],
      showById:false
        };
    this.handleClick = this.handleClick.bind(this);
    }

  componentDidMount(){
    fetch('http://192.168.1.4:8000/sensors')
    .then(response => response.json())
    .then(data => this.setState({ data }));
  }

  getComponent() {
    if (this.state.showById) {  // show the model if state showByID is true
      return <SensorID id={this.state.currentId}/>;
      
    } else {
      return null;
    }
  }

  handleClick(event) {  // switch the value of the showModal state
    this.setState({
      showById: !this.state.showById,
      currentId : event.target.firstChild.nodeValue
    });
    
  }


  render() {
    const {data} = this.state;
    return (
      <div className="container">
        <table id="sensorList">
          <thead>
            <tr>
            <th>SensorStatus</th>
            <th>SensorName</th>
            <th>SensorID</th>
            </tr>
          </thead>
            {data.map(sensor =>
          <tbody key= {sensor.sensor_id}>
            <tr>
            <td>{sensor.sensor_status}</td>
            <td>{sensor.sensor_name}</td>
            <td class="click" onClick={this.handleClick}>{sensor.sensor_id}</td>
            </tr>
          </tbody>
        )}
        </table>
        {this.getComponent()}
      </div>
    );
  }
}
export default SensorList;

