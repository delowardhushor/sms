import React, { Component } from 'react';

import {setItem, getItem} from './utilities/utilities';
import axios from 'axios';

export default class Signin extends Component {

    constructor(props){
		super(props);
		this.state={
            name:'',
            mobile:'',
            password:'',
		};
	}

    componentWillMount(){
        var userdata = getItem('userdata');
        if(userdata != null){
            this.props.history.push('/dashboard');
        }
    }

    signup(){
        axios.post('/signup', {
            name:this.state.name,
            mobile:this.state.mobile,
            password:this.state.password,
        })
        .then((res)=> {
            console.log(res);
        })
        .catch((err)=> {
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
        }else if(name == 'name'){
            this.setState({name:value});
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign Up</h5>
                        <form className="form-signin">

                        <div className="form-label-group">
                            <input type="text" name="name" value={this.state.name} onChange={this.cngText.bind(this)} id="inputName" className="form-control" placeholder="Your Name" required autoFocus />
                            <label htmlFor="inputName">Your Name</label>
                        </div>

                        <div className="form-label-group">
                            <input type="text" name="mobile" value={this.state.mobile} onChange={this.cngText.bind(this)} id="inputMobile" className="form-control" placeholder="Mobile Number" required />
                            <label htmlFor="inputMobile">Mobile Number</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password"  name="password" value={this.state.password} onChange={this.cngText.bind(this)} id="inputPassword" className="form-control" placeholder="Password" required />
                            <label htmlFor="inputPassword">Password</label>
                        </div>
                        
                        <button onClick={this.signup.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">Sign Up</button>
                        <hr className="my-4"/>
                        <button onClick={()=> this.props.history.push('/forgetpassword')} className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i className="fab fa-google mr-2"></i> Forget Password</button>
                        <button onClick={()=> this.props.history.push('/')} className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i className="fab fa-facebook-f mr-2"></i> Have Account? Sign In</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}