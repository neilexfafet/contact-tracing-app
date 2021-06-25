<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'first_name',
        'last_name',
        'gender',
        'birth_date',
        'contact_no',
        'address',
        'address_lat',
        'address_lng',
        'image'
    ];
}
