import React, { Component } from 'react';

import {setItem, getItem} from './utilities/utilities';

export default class Dashboard extends Component {

    componentWillMount(){
        var user = getItem('user');
        console.log(user);
        if(user != null){
            this.props.history.push('/dashboard');
        }
    }

    login(){
        setItem('user', {user:'Delowar', password:454545});
        this.props.history.push('/dashboard');
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
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                            <label for="inputEmail">Email address</label>
                        </div>

                        <div className="form-label-group">
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                            <label for="inputPassword">Password</label>
                        </div>

                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                        </div>
                        <button onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="button">Sign in</button>
                        <hr className="my-4"/>
                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}