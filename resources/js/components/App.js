import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';

import {setItem, getItem} from './utilities/utilities';

import './css/style.css';

import Dashboard from './Dashboard';
import Signin from './Signin';
import Signup from './Signup';

import toastr from 'toastr';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

export default class App extends Component {

    constructor(props){
		super(props);
		this.state={
            userdata:'',
		};
    }
    
    componentWillMount(){
        var userdata = getItem('userdata');
        if(userdata != null){
            this.setState({userdata:userdata});
        }
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={() => <Dashboard userdata={this.state.userdata} /> } />
                    <Route exact path="/dashboard" component={Dashboard } />
                    <Route exact path="/signin" component={Signin } /> 
                    <Route exact path="/signup" component={Signup } /> 
                </div>
            </HashRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}
