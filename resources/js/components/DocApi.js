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
                                <pre>
                                    <code>
                                        <p>{"<?php"}</p>

                                        <p>    {"$url = 'http://sms.falgunit.com/api/sms';"}</p>

                                        <p>    {"$data = array("}</p>
                                        <p>        {"'mobile' => 'Your Account Mobile',"}</p>
                                        <p>        {"'password' => 'Your Password',"}</p>
                                        <p>        {"'numbers' => 'Your Numbers(Use ',' for Multiple Numbers)',"}</p>
                                        <p>        {"'msg' => 'Your Message'"}</p>
                                        <p>    {");"}</p>

                                        <p>    {"$options = array("}</p>
                                        <p>        {"'http' => array("}</p>
                                        <p>            {'"header"  => "Content-type: application/x-www-form-urlencoded\\r\\n",'}</p>
                                        <p>            {"'method'  => 'POST',"}</p>
                                        <p>            {"'content' => http_build_query($data)"}</p>
                                        <p>        {")"}</p>
                                        <p>    {");"}</p>
                                        <p>    {"$context  = stream_context_create($options);"}</p>
                                        <p>    {"$result = file_get_contents($url, false, $context);"}</p>
                                        <p>    {"if ($result === FALSE) { "}</p>
                                        <p>        {"/* Handle error */"}</p>
                                        <p>    {"}"}</p>
                                        <p>    {"print_r($result);"}</p>
                                        <p>{"?>"}</p>
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className='col-12'>
                                <h3>Using JavaScript(Axios):</h3>
                                <p>Add Script File With Code and Replace <b>"Mobile"</b>, <b>"Password"</b>, <b>"Numbers"</b>, <b>"msg"</b> value with your own data. </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-12'>
                                <pre>
                                    <code>
                                        <p>{"<script src='https://unpkg.com/axios/dist/axios.min.js'></script>"}</p>
                                        <p>{"<script type='text/javascript'>"}</p>
                                        <p>    const data = new FormData();</p>
                                        <p>    data.append('mobile', "Your Account Mobile");</p>
                                        <p>    data.append('password', "Your Password");</p>
                                        <p>    data.append('numbers', "Your Numbers(Use ',' for Multiple Numbers)");</p>
                                        <p>    data.append('msg', "Your Message");</p>
                                        <p>    {"axios({"}</p>
                                        <p>        method: 'post',</p>
                                        <p>        url: "http://sms.falgunit.com/api/sms",</p>
                                        <p>        data: data</p>
                                        <p>    {"}).then((res) => {"}</p>
                                        <p>        console.log(res); //success code here</p>
                                        <p>    {"}).catch((err)=> {"}</p>
                                        <p>        console.log(err); //error code here</p>
                                        <p>    {"})"}</p>
                                        <p>{"</script>"}</p>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}