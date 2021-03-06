<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['middleware' => ['cors' ,'checkAuth']], function () {
    Route::post('/sms', 'MessagesController@store');
    Route::post('/allsms', 'MessagesController@allsms');

    Route::post('/confirm', 'RechargesController@confirm');
    Route::post('/suspend', 'RechargesController@suspend');
});
