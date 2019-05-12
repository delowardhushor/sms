import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Header extends Component {

    constructor(props){
		super(props);
		this.state={
            showAccount:false,
		};
	}

    componentWillReceiveProps(){

    }

    render() {
        let {userdata} = this.props;
        return (
            <header className="fal-header">
                <h1>Falfun SMS</h1>
                <div className='header-right'>
                    <span>Balance ৳ {userdata.balance}</span>
                    <span className="user-btn">
                        <i onClick={() => this.setState({showAccount:!this.state.showAccount})} className='fas fa-user-circle'></i>
                        {(this.state.showAccount) &&
                        <div className="account-btn-wrapper">
                            <Link to='/'>Profile</Link>
                            <Link to='/'>Profile</Link>
                            <Link to='/'>Signout</Link>
                        </div>
                        }
                    </span>
                </div>
            </header>
        );
    }
}