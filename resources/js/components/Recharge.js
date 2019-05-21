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

    rechargeRequest(){
       
    }


    render() {
        console.log(this.props)
        return (
            <div>
                <Header userdata={this.props.userdata} history={this.props.history} updateUser={this.props.updateUser} />
                <div className='main-wrapper' >
                    <Sidebar history={this.props.history} />
                    <div className='main-page' style={{width:mainPageWidth()}}>
                        <div className="row">
                            <div className='col-12'>
                                <h3 className="text-center">Recharge Account</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h4  className="text-center">Instruction: Send Money to <b>017....00</b> number. And Inter the Transaction id here. </h4>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className='col-12 col-sm-6'>
                                <div class="form-group">
                                    <label >Transaction Code</label>
                                    <input class="form-control form-control" type="text" placeholder="Transaction Code"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center ">
                            <div className='col-12 col-sm-6'>
                                <button onClick={this.rechargeRequest.bind(this)} type="button" class="btn btn-dark">Recharge</button>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-12'>
                                <h3 className="text-center">Recharge History</h3>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td scope="row">12th November 2019 12:34 PM</td>
                                            <td>$12000</td>
                                            <td>pending</td>
                                            </tr>
                                            <tr>
                                            <td scope="row">12th November 2019 12:34 PM</td>
                                            <td>$12000</td>
                                            <td>done</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}