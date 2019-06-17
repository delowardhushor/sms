<?php

namespace App\Http\Controllers;

use App\Messages;
use Illuminate\Http\Request;

use App\Users;

class MessagesController extends Controller
{
    private function validate_mobile($mobile)
    {
        return preg_match('/^[0-9]{11}+$/', $mobile);
    }

    public function intialdata(Request $request)
    {
        $Users = Users::where("mobile", "=", $request->input('mobile'))->first();
        return ['success' => true, 'userdata' => ['balance' => $Users->balance]];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $Users = Users::where('mobile', '=', $request->input('mobile'))->first();
        return Messages::where('users_id', '=', $Users->id)->orderBy('id', 'desc')->paginate(50);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $numbers = $request->input('numbers');
        $numbers = str_replace('+', '', str_replace(' ', '', $numbers));
        
        if(substr($numbers, -1) == ','){
            $numbers = substr_replace($numbers, "", -1);
        }

        $num_array = explode(',', $numbers);
        $valid = true;
        foreach ($num_array as $number){
            if(strlen($number) < 11){
                $valid = false;
                break;
            }else if(!$this->validate_mobile(substr($number, -11))){
                $valid = false;
                break;
            }
        }

        if($valid){

            $Users = Users::where("mobile", "=", $request->input('mobile'))->first();

            $cost = count($num_array)*ceil(strlen($request->input('msg'))/140)*.4;

            if($Users->balance < $cost)
            {
                return ['success' => false, 'msg' => 'Not Enough Balance'];
            }
            else
            {
                $Users->balance = round($Users->balance - $cost, 2);
                $Messages = new Messages;
                $Messages->users_id = $Users->id;
                $Messages->numbers = $request->input('numbers');
                $Messages->msg = $request->input('msg');
                if($Users->save() && $Messages->save()){
                    return ['success' => true, 'balance' => $Users->balance, 'cost' => $cost];
                }else{
                    return ['success' => false];
                }
            }
        }else{
            return ['success' => false, 'msg' => "Invalid Number(s)"];
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function show(messages $messages)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function edit(messages $messages)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, messages $messages)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\messages  $messages
     * @return \Illuminate\Http\Response
     */
    public function destroy(messages $messages)
    {
        //
    }
}
