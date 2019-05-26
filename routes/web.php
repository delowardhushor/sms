<?php
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Route::post('/signup', 'UsersController@store');
//Route::post('/signin', 'UsersController@login');
Route::post('/signin', 'UsersController@login');


Route::post('/verify', 'UsersController@verify');

Route::post('/setpin', 'UsersController@setpin');
Route::post('/recoverpass', 'UsersController@recoverpass');

Route::group(['middleware' => 'checkAuth'], function () {
    Route::post('/intialdata', 'MessagesController@intialdata');
    Route::post('/recharges', 'RechargesController@store');
});

