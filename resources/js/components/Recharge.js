import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem, mainPageWidth} from './utilities/utilities';

export default class Recharge extends Component {

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
                <div className='main-wrapper' style={{width:mainPageWidth()}}>
                    <Sidebar history={this.props.history} />
                    <div className='main-page'>
                        <div className="row">
                            <div className='col-12'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}