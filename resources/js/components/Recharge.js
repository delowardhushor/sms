import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem, mainPageWidth} from './utilities/utilities';

export default class Recharge extends Component {

    constructor(props){
		super(props);
		this.state={
            watchChange:false,
            recharges:{
                data:[]
            },
            rechargeLoading:false,
            tranCode: '',
		};
	}

    componentWillMount(){
        if(this.props.userdata == null || this.props.userdata == ''){
            this.props.history.push('/signin');
        }else{
            this.loadRecharge();
        }
    }

    loadRecharge(){
        axios.post('/getrecharges', {
            mobile:this.props.userdata.mobile,
            password:this.props.userdata.password,
        })
        .then((res)=> {
            if(res.data !== null){
                this.setState({recharges:res.data});
            }
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    componentWillReceiveProps(){

    }

    componentDidMount(){
        setInterval(() => {

            var chkPending =  this.chkPending();
            console.log(chkPending);
            if(chkPending.exist){
                axios.post('/checkpending', {
                    mobile:this.props.userdata.mobile,
                    password:this.props.userdata.password,
                    id:chkPending.id
                })
                .then((res)=> {
                    console.log(res)
                    if(res.data.success){
                        this.loadRecharge();
                        this.props.userdata.balance = res.data.balance;
                        this.props.updateUser(this.props.userdata);
                        if(res.data.status == 'completed'){
                            toastr.success('Thanks for using Falgun SMS', "Recharge Verified");
                        }else{
                            toastr.error('Please check your Transaction Code', "Recharge Suspended");
                        }
                    }
                })
                .catch((err)=> {
                    console.log(err);
                })
            }

        }, 10000)
    }

    chkPending(){
        let {data} = this.state.recharges;
        var exist = false;
        var id = '';
        var index = '';
        for(var i = 0; i < data.length; i++){
            if(data[i].status == 'pending'){
                exist = true;
                id = data[i].id;
                index = i;
                break;
            }
            
        }
        return {exist:exist, id:id, index:index}
    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'tranCode'){
            this.setState({tranCode:value});
        }
    }

    rechargeRequest(){
        this.setState({rechargeLoading:true});
        axios.post('/recharges', {
            mobile:this.props.userdata.mobile,
            password:this.props.userdata.password,
            code:this.state.tranCode
        })
        .then((res)=> {
            if(res.data.success){
                this.loadRecharge();
                toastr.success('Please wait for confirmation, Refresh after 2-3 minutes.', "Recharge Complete");
            }else{
                toastr.error(res.data.msg);
            }
            this.setState({rechargeLoading:false});
        })
        .catch((err)=> {
            this.setState({rechargeLoading:false});
            toastr.error(err);
        })
    }


    render() {

        const Recharges = this.state.recharges.data.map((data, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{data.created_at}</td>
                    <td>{data.amount == null ? "--" : "৳"+data.amount}</td>
                    <td className={data.status}>
                        {(data.status === 'pending')&&
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        }
                        <span className="ml-1">{data.status}</span>
                    </td>
                </tr>
            );
        });


        return (
            <div>
                <Header userdata={this.props.userdata} history={this.props.history} updateUser={this.props.updateUser} />
                <div className='main-wrapper' >
                    <Sidebar history={this.props.history} />
                    <div className='main-page' style={{width:mainPageWidth()}}>
                        <div className="row">
                            <div className='col-12'>
                                <h3 className="text-center">Recharge Account</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h4  className="text-center">Instruction: Send Money to <b>017....00</b> number. And Inter the Transaction id here. </h4>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className='col-12 col-sm-6'>
                                <div class="form-group">
                                    <label >Transaction Code</label>
                                    <input onChange={this.cngText.bind(this)} value={this.state.tranCode} name='tranCode' class="form-control form-control" type="text" placeholder="Transaction Code"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center ">
                            <div className='col-12 col-sm-6'>
                                <button onClick={this.rechargeRequest.bind(this)} type="button" class="btn btn-dark btn-sm">
                                    {this.state.rechargeLoading ? 
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> 
                                            : 
                                        'Recharge'
                                    }
                                </button>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-12'>
                                <h3 className="text-center">Recharge History</h3>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Recharges}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}