import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';

import {getItem, removeItem} from './utilities/utilities';

export default class Dashboard extends Component {

    componentWillMount(){
        var user = getItem('user');
        if(user == null){
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
                    <button onClick={this.getUser.bind(this)} type="button">Done</button>
            </div>
        );
    }
}