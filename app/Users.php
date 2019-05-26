<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    public function messages()
    {
        return $this->hasMany('App\Messages');
    }

    public function recharges()
    {
        return $this->hasMany('App\Recharges');
    }
}
