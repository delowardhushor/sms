import React, { Component } from 'react';

import {setItem, getItem} from './utilities/utilities';
import axios from 'axios';

import toastr from "toastr";

export default class Signin extends Component {

    constructor(props){
		super(props);
		this.state={
            signupLoading:false,
            confirmLoading:false,
            name:'',
            mobile:'',
            password:'',

            confirming:false,
            pin:'',
		};
	}

    componentWillMount(){
        var userdata = getItem('userdata');
        if(userdata != null){
            this.props.history.push('/dashboard');
        }
    }

    signup(){
        this.setState({signupLoading:true});
        axios.post('/signup', {
            name:this.state.name,
            mobile:this.state.mobile,
            password:this.state.password,
        })
        .then((res)=> {
            if(res.data.success){
                toastr.success('Please confirm the pin sent to your mobile', 'Confirmation!');
                this.setState({confirming:true});
            }else{
                toastr.error(res.data.msg);
            }
            this.setState({signupLoading:false});
        })
        .catch((err)=> {
            console.log(err);
            this.setState({signupLoading:false});
        })
    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'mobile'){
            this.setState({mobile:value});
        }else if(name == 'password'){
            this.setState({password:value});
        }else if(name == 'name'){
            this.setState({name:value});
        }else if(name == 'pin'){
            this.setState({pin:value});
        }
    }

    confirmPin(){
        axios.post('/verify', {
            pin:this.state.pin,
            mobile:this.state.mobile,
            password:this.state.password,
        })
        .then((res)=> {
            if(res.data.success){
                this.setState({confirming:false});
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
            console.log(err);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">{this.state.confirming ? "Confirm Pin" : "Sign Up"}</h5>
                            <form className="form-signin">

                            {(!this.state.confirming) &&
                                <div className="form-label-group">
                                    <input onKeyUp={(e) => {e.keyCode == 13 ? this.signup() : null}} type="text" name="name" value={this.state.name} onChange={this.cngText.bind(this)} id="inputName" className="form-control" placeholder="Your Name" required autoFocus />
                                    <label htmlFor="inputName">Your Name</label>
                                </div>
                            }

                            {(!this.state.confirming) &&
                                <div className="form-label-group">
                                    <input onKeyUp={(e) => {e.keyCode == 13 ? this.signup() : null}} type="text" name="mobile" value={this.state.mobile} onChange={this.cngText.bind(this)} id="inputMobile" className="form-control" placeholder="Mobile Number" required />
                                    <label htmlFor="inputMobile">Mobile Number</label>
                                </div>
                            }

                            {(!this.state.confirming) &&
                                <div className="form-label-group">
                                    <input onKeyUp={(e) => {e.keyCode == 13 ? this.signup() : null}} type="password"  name="password" value={this.state.password} onChange={this.cngText.bind(this)} id="inputPassword" className="form-control" placeholder="Password" required />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            }

                            {(!this.state.confirming) &&
                                <button onClick={this.signup.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">
                                    {this.state.signupLoading ? 
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> 
                                            : 
                                        'Sign Up'
                                    } 
                                </button>
                            }

                            {(this.state.confirming) &&
                                <div className="form-label-group">
                                    <input onKeyUp={(e) => {e.keyCode == 13 ? this.confirmPin() : null}} type="text" name="pin" value={this.state.pin} onChange={this.cngText.bind(this)} id="inputPin" className="form-control" placeholder="Pin" required autoFocus />
                                    <label htmlFor="inputName">Pin</label>
                                </div>
                            }

                            {(this.state.confirming) &&
                                <button onClick={this.confirmPin.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">
                                    {this.state.confirmLoading ? 
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> 
                                            : 
                                        'Confilm Pin'
                                    }
                                </button>
                            }

                            <hr className="my-4"/>
                            <button onClick={()=> this.props.history.push('/')} className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i class="fas fa-sign-in-alt mr-2"></i> Want to Sign In?</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}