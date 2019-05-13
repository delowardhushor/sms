import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem} from './utilities/utilities';

export default class Sms extends Component {

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
                    <div id='main-page'>
                        <div className="row">
                            <div className='col-12'>
                                sdfsd fsdfsdf sdfsdf sdf sdf sdf sdf sdf sdfs df sdfs dfsdfsdfsdf sdfsdf sdf sdf dfgdfg df dffg dffg dffg dffg dffg dffgdf g dfg dfg dfgdfgd fgd fgd fgdfg dffg df cbcbcvbb cbdcbf dfbdffg
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}