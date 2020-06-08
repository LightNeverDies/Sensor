import React from 'react'
import '../css/Header.css'
import {NavLink} from 'react-router-dom'


class Header extends React.Component {

    render() {
        return (
            <div class="wrapper">
                <div class="menu-bar">
                    <nav class="main-nav">
                        <NavLink class="sens" to="/sensors">Information About Sensors</NavLink>
                        <NavLink class="sens" to="/sensors/real">Real-Time Data About Sensors</NavLink>
                    </nav>
                </div>
            </div>
        );
    }
}
export default Header;
