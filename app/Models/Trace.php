<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Trace extends Model
{
    use HasFactory;

    protected $fillable = [
        'establishment_id',
        'user_id'
    ];

    public function getEstablishment() {
        return $this->hasOne(User::class, 'id', 'establishment_id');
    }

    public function getUser() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
