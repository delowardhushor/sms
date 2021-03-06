import React, { Component } from 'react';

import {setItem, getItem} from './utilities/utilities';
import axios from 'axios';

import toastr from "toastr";

export default class Signin extends Component {

    constructor(props){
		super(props);
		this.state={
            loginLoading:false,
            mobile:'',
            password:'',
		};
	}

    componentWillMount(){
        console.log(this.props);
        if(this.props.userdata != null && this.props.userdata != ''){
            this.props.history.push('/dashboard');
        }
    }

    login(){
        this.setState({loginLoading:true});
        axios.post('/signin', {
            mobile:this.state.mobile,
            password:this.state.password
        })
        .then((res)=> {
            this.setState({loginLoading:false});
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
            this.setState({loginLoading:false});
            console.log(err);
        })
    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'mobile'){
            this.setState({mobile:value});
        }else if(name == 'password'){
            this.setState({password:value});
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <form className="form-signin">

                        <div className="form-label-group">
                            <input type="text" onKeyUp={(e) => {e.keyCode == 13 ? this.login() : null}} name="mobile" value={this.state.mobile} onChange={this.cngText.bind(this)} id="inputEmail" className="form-control" placeholder="Mobile Number" required autoFocus />
                            <label htmlFor="inputEmail">Mobile Number</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" onKeyUp={(e) => {e.keyCode == 13 ? this.login() : null}}  name="password" value={this.state.password} onChange={this.cngText.bind(this)} id="inputPassword" className="form-control" placeholder="Password" required />
                            <label htmlFor="inputPassword">Password</label>
                        </div>
                        
                        <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">
                            {this.state.loginLoading ? 
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> 
                                    : 
                                'Sign in'
                            } 
                        </button>
                        <hr className="my-4"/>
                        <button onClick={()=> this.props.history.push('/forgetpassword')} className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i class="fas fa-fingerprint mr-2"></i> Forget Password</button>
                        <button onClick={()=> this.props.history.push('/signup')} className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i class="fas fa-user-plus mr-2"></i> No Account? Sign Up</button>

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}