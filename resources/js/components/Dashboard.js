import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';

import {getItem, removeItem} from './utilities/utilities';

export default class Dashboard extends Component {

    componentWillMount(){
        var userdata = getItem('userdata');
        if(userdata == null){
            this.props.history.push('/');
        }
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
        return (
            <div>
                <Header />
                <button onClick={removeItem('userdata')}></button>
            </div>
        );
    }
}