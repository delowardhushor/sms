import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import Header from './Header';
import Sidebar from './Sidebar';

import Pagination from './modules/Pagination';

import {getItem, removeItem, mainPageWidth, baseUrl} from './utilities/utilities';

export default class AllSms extends Component {

    constructor(props){
		super(props);
		this.state={
            watchChange:false,
            AllSms:{
                data:[]
            },
            rechargeLoading:false,
            tranCode: '',
        };
        this.loadPage = this.loadPage.bind(this);
	}

    componentWillMount(){
        if(this.props.userdata == null || this.props.userdata == ''){
            this.props.history.push('/signin');
        }else{
            this.loadPage();
        }
    }

    loadPage(url = "/allsms"){
        axios.post(url, {
            mobile:this.props.userdata.mobile,
            password:this.props.userdata.password,
        })
        .then((res)=> {
            console.log(res)
            if(res.data !== null){
                this.setState({AllSms:res.data});
            }
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    componentWillReceiveProps(){

    }

    cngText(e){
        var name = e.target.name;
        var value = e.target.value;
        if(name == 'tranCode'){
            this.setState({tranCode:value});
        }
    }

    render() {

        let {AllSms} = this.state;

        const AllSmsList = AllSms.data.map((data, index) => {
            return (
                <tr key={index}>
                    <td scope="row">{data.created_at}</td>
                    <td>{data.numbers}</td>
                    <td>{data.msg}</td>
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
                                <h3 className="text-center">Sent SMS List</h3>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col-12'>
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Numbers</th>
                                            <th scope="col">Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {AllSmsList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Pagination data={AllSms} loadPage={this.loadPage} />
                    </div>
                </div>
            </div>
        );
    }
}