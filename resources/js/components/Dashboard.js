import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem} from './utilities/utilities';

export default class Dashboard extends Component {

    componentWillMount(){
        var userdata = getItem('userdata');
       // console.log(userdata);
        if(userdata == null){
            this.props.history.push('/signin');
        }
    }

    componentWillReceiveProps(){
        //console.log(this.props);
    }

    getUser(){
        axios.post('/users',{
            data:''
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);            
        })
    }


    render() {
        console.log("asas", this.props.userdata)
        return (
            <div>
                <Header userdata={this.props.userdata} />
                <div className='main-wrapper'>
                    <Sidebar />
                    <div className='main-page'>
                        this is page
                    </div>
                </div>
            </div>
        );
    }
}