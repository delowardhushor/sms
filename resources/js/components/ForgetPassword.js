import React, { Component } from 'react';

import {setItem, getItem} from './utilities/utilities';
import axios from 'axios';

import toastr from "toastr";

export default class ForgetPassword extends Component {

    constructor(props){
		super(props);
		this.state={
            pinSending:false,
            mobile:'',
            
            recoverPass:false,
            pin:'',

            newPass:'',
            conPass:''
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
                        <h5 className="card-title text-center">Recover Password</h5>
                        <form className="form-signin">

                        <div className="form-label-group">
                            <input type="text" onKeyUp={(e) => {e.keyCode == 13 ? this.login() : null}} name="mobile" value={this.state.mobile} onChange={this.cngText.bind(this)} id="inputEmail" className="form-control" placeholder="Mobile Number" required autoFocus />
                            <label htmlFor="inputEmail">Mobile Number</label>
                        </div>
                        
                        <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">
                            {this.state.pinSending ? 
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div> 
                                    : 
                                'Recover'
                            } 
                        </button>
                        <hr className="my-4"/>

                        <button onClick={()=> this.props.history.push('/signin')} className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i class="fas fa-user-plus mr-2"></i> Sign In</button>

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}