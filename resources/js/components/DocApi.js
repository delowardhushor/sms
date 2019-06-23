import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';

import {getItem, removeItem, mainPageWidth} from './utilities/utilities';

export default class DocApi extends Component {

    componentWillMount(){
        if(this.props.userdata == null || this.props.userdata == ''){
            this.props.history.push('/signin');
        }
    }

    componentWillReceiveProps(){
        //console.log(this.props);
    }

    getUser(){
        axios.post('/users',{
            data:''
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=> {
            console.log(err);            
        })
    }


    render() {
        console.log(this.props)

        var phpCode = "<?php \n $r = new HttpRequest('http://example.com/form.php', HttpRequest::METH_POST); $r->setOptions(array('cookies' => array('lang' => 'de'))); $r->addPostFields(array('user' => 'mike', 'pass' => 's3c|r3t')); try { echo $r->send()->getBody(); } catch (HttpException $ex) { echo $ex; } ?>";
        
        return (
            <div>
                <Header userdata={this.props.userdata} history={this.props.history} updateUser={this.props.updateUser} />
                <div className='main-wrapper'>
                    <Sidebar history={this.props.history} />
                    <div className='main-page' style={{width:mainPageWidth()}}>
                        <div className="row">
                            <div className='col-12'>
                                <h1 className="text-center">Api Documentation</h1>
                                <h3 className="text-center">Sent SMS from your Website or Mobile App</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-12'>
                                <h3>Using PHP:</h3>
                                <p>Just Copy The Code and place in your php file. Replace <b>"Mobile"</b>, <b>"Password"</b>, <b>"Numbers"</b>, <b>"msg"</b> value with your own data. </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-12'>
                                <code>
                                    <p>{"<?php"}</p>

                                    <p className="sp-1">{"$url = 'http://sms.falgunit.com/api/sms';"}</p>

                                    <p className="sp-1">{"$data = array("}</p>
                                        <p className="sp-2">{"'mobile' => 'Your Account Mobile',"}</p>
                                        <p className="sp-2">{"'password' => 'Your Password',"}</p>
                                        <p className="sp-2">{"'numbers' => 'Your Numbers',"}</p>
                                        <p className="sp-2">{"'msg' => 'Your Message'"}</p>
                                    <p className="sp-1">{");"}</p>

                                    <p className="sp-1">{"$options = array("}</p>
                                        <p className="sp-2">{"'http' => array("}</p>
                                            <p className="sp-3">{'"header"  => "Content-type: application/x-www-form-urlencoded\\r\\n",'}</p>
                                            <p className="sp-3">{"'method'  => 'POST',"}</p>
                                            <p className="sp-3">{"'content' => http_build_query($data)"}</p>
                                        <p className="sp-2">{")"}</p>
                                        <p className="sp-1">{");"}</p>
                                    <p className="sp-1">{"$context  = stream_context_create($options);"}</p>
                                    <p className="sp-1">{"$result = file_get_contents($url, false, $context);"}</p>
                                    <p className="sp-1">{"if ($result === FALSE) { "}</p>
                                    <p className="sp-2">{"/* Handle error */"}</p>
                                    <p className="sp-1">{"}"}</p>
                                    <p className="sp-1">{"print_r($result);"}</p>
                                    <p>{"?>"}</p>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}