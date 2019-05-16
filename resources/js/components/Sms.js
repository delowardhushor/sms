import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem, mainPageWidth} from './utilities/utilities';

import toastr from "toastr";

export default class Sms extends Component {

    constructor(props){
		super(props);
		this.state={
            numbers:'',
            msg:'',
            cost:0,
        };
	}

    componentWillMount(){
        if(this.props.userdata == null || this.props.userdata == ''){
            this.props.history.push('/signin');
        }
    }

    componentWillReceiveProps(){
        //console.log(this.props);
    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'numbers'){
            this.setState({numbers:value});
            this.calculateCost(value, this.state.msg);
        }else if(name == 'msg'){
            this.setState({msg:value});
            this.calculateCost(this.state.numbers, value);
        }
    }

    calculateCost(numbers, msg){
        var numArray = numbers.split(',');
        var cost = numArray.length*(Math.trunc(this.state.msg.length/140)+1)*0.4;
        this.setState({cost:cost});
    }

    chkValidNum(){
        var numbers = this.state.numbers;
        var numArray = numbers.split(',');
        var notvalid = false;
        for(var i = 0; i < numArray.length; i++){
            if(isNaN(numArray[i].replace('+',''))){
                return true;
                break;
            }
        }
        return notvalid;
    }

    sendSms(){
        if(this.chkValidNum()){
            toastr.error('INvalid Number(s)', 'Attention!');
        }
        else if(this.state.cost > this.props.userdata.balance){
            toastr.error('Not Enough Balance', 'Attention!');
        }else if(!this.state.msg){
            toastr.error('Message Empty', 'Attention!');
        }else if(!this.state.numbers){
            toastr.error('Please Add Number', 'Attention!');
        }
    }


    render() {
        console.log(this.props)
        return (
            <div>
                <Header {...this.props} />
                <div className='main-wrapper'>
                    <Sidebar history={this.props.history} />
                    <div className='main-page' style={{width:mainPageWidth()}}>
                        <div className="row">
                            <div className="col-12">
                                <div className="f-c-sb">
                                    <h3>Send SMS</h3>
                                    <div className="">
                                        <h5 className={this.state.cost > this.props.userdata.balance ? 'text-danger' : 'text-success'}>Cost: {this.state.cost.toFixed(2)} {this.state.cost > this.props.userdata.balance ? '(Not Enough Balance)' : ''}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                <div class="form-group">
                                    <label for="numbers">Add Numbers</label>
                                    {this.chkValidNum() ? <p className='text-danger'>Invalid Number(s)</p> : null}
                                    <textarea value={this.state.numbers} onChange={this.cngText.bind(this)} class="form-control" name='numbers' id="numbers" rows="3"></textarea>
                                    <p>for multiple numbers, use <b>comma ( , )</b> for separation <br/><b>ex:  017..001 , 019..001 , 015..001 </b></p>
                                </div>
                            </div>
                            <div className='col-8'>
                                <div class="form-group">
                                    <label for="msg">Message</label>
                                    <textarea value={this.state.msg} onChange={this.cngText.bind(this)} class="form-control" name='msg' id="msg" rows="3"></textarea>
                                    <p>character: {140 - this.state.msg.length % 140}<b>({Math.trunc(this.state.msg.length/140)+1})</b></p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-12'>
                                <button onClick={this.sendSms.bind(this)} type="button" class="btn btn-dark">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}