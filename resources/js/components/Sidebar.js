import React, { Component } from 'react';

import {getItem, removeItem} from './utilities/utilities';
import {Link} from 'react-router-dom'


export default class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar shadow">
                <div class="list-group">
                <Link to="#" class="list-group-item list-group-item-action active">
                    Dashboard
                </Link>
                <Link to="#" class="list-group-item list-group-item-action">Send SMS</Link>
                <Link to="#" class="list-group-item list-group-item-action">Morbi leo risus</Link>
                <Link to="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</Link>
                <Link to="#" class="list-group-item list-group-item-action disabled">Vestibulum at eros</Link>
                </div>
            </div>
        );
    }
}