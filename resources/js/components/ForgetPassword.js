import React, { Component } from 'react';

import {setItem, getItem} from './utilities/utilities';
import axios from 'axios';

import toastr from "toastr";

export default class ForgetPassword extends Component {

    constructor(props){
		super(props);
		this.state={
            loading:false,
            mobile:'',
            
            pinSent:false,
            pin:'',
            password:'',
            conPass:''
		};
	}

    componentWillMount(){
        if(this.props.userdata != null && this.props.userdata != ''){
            this.props.history.push('/dashboard');
        }
    }

    setPin(){
        this.setState({loading:true});
        axios.post('/setpin', {
            mobile:this.state.mobile,
        })
        .then((res)=> {
            this.setState({loading:false});
            if(res.data.success){
                this.setState({pinSent:true});
                toastr.success('Please Update Your Password Using The Pin Sent to Your Mobile', 'Pin Sent');
            }else{
                toastr.error(res.data.msg);
            }
        })
        .catch((err)=> {
            this.setState({loading:false});
        })
    }

    recoverPass(){
        console.log(this.state);
        if(this.state.password !== this.state.conPass){
            toastr.error("Confirm Password Didn't Matched");
        }else if(this.state.mobile && this.state.password && this.state.conPass && this.state.pin){
            this.setState({loading:true});
            axios.post('/recoverpass', {
                mobile:this.state.mobile,
                password:this.state.password,
                pin:this.state.pin,
            })
            .then((res)=> {
                this.setState({loading:false});
                console.log(res);
                if(res.data.success){
                    var userdata = res.data.userdata;
                    userdata.password = this.state.password;
                    this.props.updateUser(userdata);
                    setItem('userdata', userdata);
                    toastr.success('Welcome To Falgun SMS Service', 'Hi '+userdata.name+'!');
                    this.props.history.push('/dashboard');
                }else{
                    toastr.error(res.data.msg);
                }
            })
            .catch((err)=> {
                this.setState({loading:false});
                console.log(err);
            })
        }else{
            toastr.error("Fill Empty");
        }
    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'mobile'){
            this.setState({mobile:value});
        }else if(name == 'password'){
            this.setState({password:value});
        }else if(name == 'conPass'){
            this.setState({conPass:value});
        }else if(name == 'pin'){
            this.setState({pin:value});
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Recover Password</h5>
                        <form className="form-signin">

                        {(!this.state.pinSent) &&
                            <div className="form-label-group">
                                <input type="text" onKeyUp={(e) => {e.keyCode == 13 ? this.setPin() : null}} name="mobile" value={this.state.mobile} onChange={this.cngText.bind(this)} id="inputEmail" className="form-control" placeholder="Mobile Number" required autoFocus />
                                <label htmlFor="inputEmail">Mobile Number</label>
                            </div>
                        }

                        {(!this.state.pinSent) &&
                            <button onClick={this.setPin.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">
                                {this.state.loading ? 
                                    <div class="spinner-border spinner-border-sm" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> 
                                        : 
                                    'Recover'
                                } 
                            </button>
                        }

                        {(this.state.pinSent) &&
                            <div className="form-label-group">
                                <input type="text" onKeyUp={(e) => {e.keyCode == 13 ? this.recoverPass() : null}} name="pin" value={this.state.pin} onChange={this.cngText.bind(this)} id="sentPin" className="form-control" placeholder="Pin" required autoFocus />
                                <label htmlFor="sentPin">Pin</label>
                            </div>
                        }

                        {(this.state.pinSent) &&
                            <div className="form-label-group">
                                <input type="password" onKeyUp={(e) => {e.keyCode == 13 ? this.recoverPass() : null}} name="password" value={this.state.password} onChange={this.cngText.bind(this)} id="password" className="form-control" placeholder="New Password" required autoFocus />
                                <label htmlFor="password">New Password</label>
                            </div>
                        }

                        {(this.state.pinSent) &&
                            <div className="form-label-group">
                                <input type="password" onKeyUp={(e) => {e.keyCode == 13 ? this.recoverPass() : null}} name="conPass" value={this.state.conPass} onChange={this.cngText.bind(this)} id="conPass" className="form-control" placeholder="Confirm Password" required autoFocus />
                                <label htmlFor="conPass">Confirm Password</label>
                            </div>
                        }

                        {(this.state.pinSent) &&
                            <button onClick={this.recoverPass.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">
                                {this.state.loading ? 
                                    <div class="spinner-border spinner-border-sm" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div> 
                                        : 
                                    'Confirm'
                                } 
                            </button>
                        }

                        <hr className="my-4"/>

                        <button onClick={()=> this.props.history.push('/signin')} className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i class="fas fa-sign-in mr-2"></i> Sign In</button>

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}