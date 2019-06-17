<?php

namespace App\Http\Controllers;

use App\Recharges;
use Illuminate\Http\Request;

use App\Users;

class RechargesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $Users = Users::where('mobile', '=', $request->input('mobile'))->first();
        return Recharges::where('users_id', '=', $Users->id)->orderBy('id', 'desc')->paginate(50);
    }

    public function checkpending(Request $request)
    {
        $recharges = Recharges::find($request->input('id'));
        $Users = Users::where('mobile', '=', $request->input('mobile'))->first();
        if($recharges->users_id != $Users->id || $recharges->status == 'pending'){
            return ['success' => false];
        }else{
            return ['success' => true, 'status' => $recharges->status, 'balance' => $Users->balance];
        }
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
        $Users = Users::where("mobile", "=", $request->input('mobile'))->first();
        $recharges = new Recharges;
        $recharges->users_id = $Users->id;
        $recharges->code = $request->input("code");
        if($recharges->save()){
            return ['success' => true, 'recharge' => Recharges::find($recharges->id)];
        }else{
            return ['success' => false, 'msg' => "Recharge Failed"];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Recharges  $recharges
     * @return \Illuminate\Http\Response
     */
    public function show(Recharges $recharges)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Recharges  $recharges
     * @return \Illuminate\Http\Response
     */
    public function edit(Recharges $recharges)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Recharges  $recharges
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Recharges $recharges)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Recharges  $recharges
     * @return \Illuminate\Http\Response
     */
    public function destroy(Recharges $recharges)
    {
        //
    }
}
