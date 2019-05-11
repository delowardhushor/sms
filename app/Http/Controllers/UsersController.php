<?php

namespace App\Http\Controllers;

use App\Users;
use Illuminate\Http\Request;
namespace App\Http\Controllers;
use App\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
//use App\Http\Requests;
use App\Http\Resources\Users as UserResource;
class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Users = Users::all();
        return UserResource::collection($Users);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //return Users::create($request->all());
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $Users = Users::where("mobile", "=", $request->input('mobile'))->first();        
        if($Users == '' || $Users->verified == 0){
            if($Users == ''){
                $Users = new Users;
            }
            $Users->name = $request->input('name');
            $Users->mobile = $request->input('mobile');
            $Users->password = Hash::make($request->input('password'));
            $Users->remember_token = Hash::make(random_bytes(10));
            $pin = rand(100000,999999);
            $this->sendSms($request->input('mobile'), $pin."**is**Your**Tolet**Verification**Pin**-**Tolet");
            $Users->pin = Hash::make($pin);
            if($Users->save()){
                return [
                    'success' => true,
                ];
            }  
        }else{
            return ['success' => false, 'msg' => 'Number Used Allready'];
        } 
    }
    public function sendSms($mobile, $msg, array $options = array()){
        $defaults = array( 
            CURLOPT_URL => "http://delowarhossaintb.000webhostapp.com/falgunsms.php?authorized=3356927&mobile=".$mobile."&msg=".$msg, 
            CURLOPT_HEADER => 0, 
            CURLOPT_RETURNTRANSFER => TRUE, 
            CURLOPT_TIMEOUT => 4 
        ); 
        
        $ch = curl_init(); 
        curl_setopt_array($ch, ($options + $defaults)); 
        if( ! $result = curl_exec($ch)) 
        { 
            trigger_error(curl_error($ch)); 
        } 
        curl_close($ch); 
    }
    public function setpin(Request $request)
    {
        $Users = Users::where("mobile", "=", $request->input('mobile'))->first();
        if($Users == ''){
            return ['success' => false, 'msg' => 'Invalid Information'];
        }
        else{
            $pin = rand(100000,999999);
            $this->sendSms($request->input('mobile'), $pin."**is**your**Tolet**verification**pin**-**Tolet");
            $Users->pin = Hash::make($pin);
            if($Users->save()){
                return [
                    'success' => true,
                ];
            }  
        }
    }
    public function recoverpass(Request $request)
    {
        $Users = Users::where("mobile", "=", $request->input('mobile'))->first();
        if($Users == ''){
            return ['success' => false, 'msg' => 'Invalid Information'];
        }
        elseif($Users !== '' && Hash::check($request->input('pin'), $Users->pin) === true){
            $Users->pin = '';
            $user->verified = 1;
            $Users->password = Hash::make($request->input('password'));
            $Users->remember_token = Hash::make(random_bytes(10));
            if($Users->save()){
                return [
                    'success' => true, 
                    'userdata' => 
                        [
                            'id' => $Users->id, 
                            'name' => $Users->name, 
                            'mobile' => $Users->mobile,
                            'token' => $Users->remember_token
                        ], 
                ];
            }
        }else{
            return ['success' => false, 'msg' => 'Invalid Pin'];
        }
    }
    public function cngpass(Request $request)
    {
        $Users = Users::where("mobile", "=", $request->input('mobile'))->first();
        if($Users == ''){
            return ['success' => false, 'msg' => 'Invalid Information'];
        }
        elseif($Users !== '' && Hash::check($request->input('oldPass'), $Users->password) === true){
            $Users->password = Hash::make($request->input('newPass'));
            if($Users->save()){
                return ['success' => true];
            }
        }else{
            return ['success' => false, 'msg' => 'Invalid Pin'];
        }
    }
    public function verify(Request $request)
    {
        $user = Users::where("mobile", "=", $request->input('mobile'))->first();
        if($user == ''){
            return ['success' => false, 'msg' => 'Invalid Information'];
        }
        elseif($user !== '' && Hash::check($request->input('password'), $user->password) === true && Hash::check($request->input('pin'), $user->pin) === true){
              $user->pin = '';
              $user->verified = 1;
             if($user->save()){
                return [
                    'success' => true, 
                    'userdata' => 
                        [
                            'id' => $user->id, 
                            'name' => $user->name, 
                            'mobile' => $user->mobile,
                            'token' => $user->remember_token
                        ], 
                ];
            }
        }else{
            return ['success' => false, 'msg' => 'Invalid Pin'];
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $user = Users::where("mobile", "=", $request->input('mobile'))->where("verified", "=", 1)->first();
        if($user == ''){
            return ['success' => false, 'msg' => 'Invalid Information'];
        }
        elseif($user !== '' && Hash::check($request->input('password'), $user->password) === true){
            $user->remember_token = Hash::make(random_bytes(10));
            if($user->save()){
                return [
                    'success' => true, 
                    'userdata' => 
                        [
                            'id' => $user->id, 
                            'name' => $user->name, 
                            'mobile' => $user->mobile , 
                            'token' => $user->remember_token
                        ], 
                ];
            }
        }else{
            return ['success' => false, 'msg' => 'Invalid Information'];
        }
    }
    // public function checkAuth(Request $request){
    //     return Users::where("mobile", "=", $request->input('loggedUserID'))->where("remember_token", "=", $request->input('token'))->first();
    // }
    /**
     * Display the specified resource.
     *
     * @param  \App\Users  $users
     * @return \Illuminate\Http\Response
     */
    public function show(Users $users)
    {
        //
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Users  $users
     * @return \Illuminate\Http\Response
     */
    public function edit(Users $users)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Users  $users
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Users $users)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Users  $users
     * @return \Illuminate\Http\Response
     */
    public function destroy(Users $users)
    {
        //
    }
}