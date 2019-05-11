import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';

import './css/style.css';

import Dashboard from './Dashboard';
import Login from './Login';

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={Login } /> 
                    <Route exact path="/dashboard" component={Dashboard } /> 
                </div>
            </HashRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}
