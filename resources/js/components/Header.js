import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {getItem, removeItem} from './utilities/utilities';

import toastr from "toastr";

export default class Header extends Component {

    constructor(props){
		super(props);
		this.state={
            showAccount:false,
		};
	}

    componentWillReceiveProps(){

    }

    logout(e){
        e.preventDefault();
        toastr.success('Thanks for using Falgun SMS service', 'Signed Out!');
        this.props.updateUser('');
        removeItem('userdata');
        this.props.history.push('/signin');
    }

    render() {
        let {userdata} = this.props;
        return (
            <header className="fal-header">
                <h1>Falfun SMS</h1>
                <div className='header-right'>
                    <span>Balance ৳ {userdata.balance}</span>
                    <span className="user-btn">
                        <i onClick={() => this.setState({showAccount:!this.state.showAccount})} onBlur={()=> this.setState({showAccount:false})} className='fas fa-user-circle'></i>
                        {(this.state.showAccount) &&
                        <div className="account-btn-wrapper">
                            <Link to='/'>Profile</Link>
                            <Link to='/'>Profile</Link>
                            <a href='#' onClick={this.logout.bind(this)} >Signout</a>
                        </div>
                        }
                    </span>
                </div>
            </header>
        );
    }
}