import React, { Component } from 'react';

import {getItem, removeItem} from './utilities/utilities';
import {Link} from 'react-router-dom'


export default class Sidebar extends Component {

    render() {
        let {pathname} = this.props.history.location;
        return (
            <div className="sidebar shadow">
                <div class="list-group">
                    <Link to="/dashboard" className={pathname == '/dashboard' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} >
                        Dashboard
                    </Link>
                    <Link to="/sms" className={pathname == '/sms' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
                        Send SMS
                    </Link>
                    <Link to="/allsms" className={pathname == '/allsms' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
                        All SMS
                    </Link>
                    <Link to="/recharge" className={pathname == '/recharge' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
                        Recharge Account
                    </Link>
                    <Link to="/doc/api" className={pathname == '/doc/api' ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>
                        API Documentation
                    </Link>
                </div>
            </div>
        );
    }
}