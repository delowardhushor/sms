import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem} from './utilities/utilities';

export default class Dashboard extends Component {

    componentWillMount(){
        if(this.props.userdata == null || this.props.userdata == ''){
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
        console.log(this.props)
        return (
            <div>
                <Header userdata={this.props.userdata} history={this.props.history} updateUser={this.props.updateUser} />
                <div className='main-wrapper'>
                    <Sidebar />
                    <div className='main-page'>
                        this is page
                    </div>
                    <button onClick={() => this.props.updateUser()}>sdfdsf</button>
                </div>
            </div>
        );
    }
}