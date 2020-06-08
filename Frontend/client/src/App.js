import React from 'react';
import './css/App.css';
import Header from './components/Header'
import SensorList from './components/SensorList'
import SensorID from './components/SensorID'
import Error from './components/Error'
import SensorReal from './components/SensorReal'
import { BrowserRouter,Switch,Route } from 'react-router-dom';


class App extends React.Component{
render(){
  return(
    <BrowserRouter>
    <div>
      <Header />
      <Switch>
             <Route path="/sensors" component={SensorList} exact/>
             <Route path="/sensors/id" component={SensorID}/>
             <Route path="/sensors/real" component ={SensorReal}/> 
            <Route component={Error}/>
           </Switch>
    </div>
    <div>
    </div>
    </BrowserRouter>
  )
}
}
export default App;



