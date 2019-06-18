import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';

import {setItem, getItem, removeItem} from './utilities/utilities';

import './css/style.css';

import Dashboard from './Dashboard';
import Signin from './Signin';
import Signup from './Signup';
import Sms from './Sms';
import AllSms from './AllSms';
import DocApi from './DocApi';
import Recharge from './Recharge';

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
            sitedata:{
                messages:[],
                recharges:[]
            }
        };
        this.updateUser = this.updateUser.bind(this);
        this.updateInitialData = this.updateInitialData.bind(this);
    }
    
    componentWillMount(){
        var userdata = getItem('userdata');
        if(userdata != null){
            this.setState({userdata:userdata});
            this.intialdata(userdata);
        }
    }

    componentDidMount(){
        // var mainPage = document.getElementById('main-page');
        // if(mainPage != null){
        //     mainPage.style.width = (window.innerWidth-200)+'px';
        // }
    }

    updateUser(userdata){
        this.setState({userdata:userdata});
        setItem('userdata', userdata);
    }

    intialdata(userdata){
        axios.post('/intialdata', {
            mobile:userdata.mobile,
            password:userdata.password,
        })
        .then((res)=> {
            console.log(res);
            if(res.data.success){
                userdata.balance = res.data.userdata.balance;
                this.setState({userdata:userdata});
            }else{
                removeItem('userdata');
                toastr.error("Please Signin", "Session Expired");
            }
        })
        .catch((err)=> {
            toastr.error(err);
        })
    }

    updateInitialData(field, data){
        var sitedata = JSON.parse(JSON.stringify(this.state.sitedata));
        sitedata[field] = data;
        this.setState({sitedata:sitedata});
    }

    render() {
        let {sitedata, userdata} = this.state;
        return (
            <HashRouter>
                <div>
                    {/* <Route exact path="/" component={() => <Dashboard userdata={this.state.userdata} /> } />
                    <Route exact path="/dashboard" component={Dashboard } />
                    <Route exact path="/signin" component={Signin } /> 
                    <Route exact path="/signup" component={Signup } />  */}
                    <Route
                        exact 
                        path="/" 
                        render={(props) => <Dashboard {...props} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/dashboard" 
                        render={(props) => <Dashboard {...props} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/signin" 
                        render={(props) => <Signin {...props} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/signup" 
                        render={(props) => <Signup {...props} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/sms" 
                        render={(props) => <Sms {...props} sitedata={sitedata} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/allsms" 
                        render={(props) => <AllSms {...props} sitedata={sitedata} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/recharge" 
                        render={(props) => <Recharge {...props} sitedata={sitedata} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                    <Route
                        exact 
                        path="/doc/api" 
                        render={(props) => <DocApi {...props} userdata={userdata} updateUser={this.updateUser} />} 
                    />
                </div>
            </HashRouter>
        );
    }
}

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}
