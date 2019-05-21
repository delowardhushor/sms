<?php

namespace App\Http\Controllers;

use App\Recharges;
use Illuminate\Http\Request;

class RechargesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "dfdfdfd";
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
        $recharges = new Recharges;
        $recharges->code = $request->input("code");
        if($recharges->save()){
            return ['success' => true, 'recharge' => $recharges];
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
