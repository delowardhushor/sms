import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import Header from './Header';
import Sidebar from './Sidebar';

import Pagination from './modules/Pagination';

import {getItem,setItem, removeItem, mainPageWidth} from './utilities/utilities';

export default class UpdatePassword extends Component {

    constructor(props){
		super(props);
		this.state={
            loading:false,
            oldPass:'',
            newPass:'',
            conPass:'',
        };
	}

    componentWillMount(){
        if(this.props.userdata == null || this.props.userdata == ''){
            this.props.history.push('/signin');
        }
    }

    cngPass(){
        if(this.state.newPass !== this.state.conPass){
            toastr.error("Confirm Password Didn't Matched");
        }else if(this.props.userdata.mobile && this.state.oldPass && this.state.conPass && this.state.newPass){
            this.setState({loading:true});
            axios.post('/cngpass', {
                mobile:this.props.userdata.mobile,
                newPass:this.state.newPass,
                oldPass:this.state.oldPass,
            })
            .then((res)=> {
                this.setState({loading:false});
                if(res.data.success){
                    var userdata = JSON.parse(JSON.stringify(this.props.userdata));
                    userdata.password = this.state.newPass;
                    this.props.updateUser(userdata);
                    setItem('userdata', userdata);
                    toastr.success('Password Updated');
                }else{
                    toastr.error(res.data.msg);
                }
            })
            .catch((err)=> {
                console.log(err);
                this.setState({loading:false});
            })
        }else{
            toastr.error("Fill Empty");
        }
    }

    componentWillReceiveProps(){

    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'oldPass'){
            this.setState({oldPass:value});
        }else if(name == 'newPass'){
            this.setState({newPass:value});
        }else if(name == 'conPass'){
            this.setState({conPass:value});
        }
    }


    render() {

        return (
            <div>
                <Header userdata={this.props.userdata} history={this.props.history} updateUser={this.props.updateUser} />
                <div className='main-wrapper' >
                    <Sidebar history={this.props.history} />
                    <div className='main-page' style={{width:mainPageWidth()}}>
                        <div className="row">
                            <div className='col-12'>
                                <h3 className="text-center">Update Password</h3>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className='col-12 col-sm-6'>
                                <div class="form-group">
                                    <label >Current Password</label>
                                    <input onChange={this.cngText.bind(this)} value={this.state.oldPass} name='oldPass' class="form-control form-control" type="password" placeholder="Current Password"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='col-12 col-sm-6'>
                                <div class="form-group">
                                    <label >New Password</label>
                                    <input onChange={this.cngText.bind(this)} value={this.state.newPass} name='newPass' class="form-control form-control" type="password" placeholder="New Password"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='col-12 col-sm-6'>
                                <div class="form-group">
                                    <label >Confirm New Password</label>
                                    <input onChange={this.cngText.bind(this)} value={this.state.conPass} name='conPass' class="form-control form-control" type="password" placeholder="Confirm New Password"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center ">
                            <div className='col-12 col-sm-6'>
                                <button onClick={this.cngPass.bind(this)} type="button" class="btn btn-dark btn-sm">
                                    {this.state.rechargeLoading ? 
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> 
                                            : 
                                        'Update'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}