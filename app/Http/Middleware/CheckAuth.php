<?php
namespace App\Http\Middleware;
use Closure;
use App\Users;
use Illuminate\Http\Request;
use App\Http\Resources\Users as UserResource;
use Illuminate\Support\Facades\Hash;

class CheckAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // $user = Users::where("mobile", "=", $request->input('mobile'))->first();

        // if($user !== '' && Hash::check($request->input('password'), $user->password) === true)
        // {
        //     return $next($request);
        // }else{
        //     return null;
        // }
        return $next($request);
    }
}