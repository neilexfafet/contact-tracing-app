<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'establishment_id',
        'announcement'
    ];

    public function getEstablishment() {
        return $this->hasOne(User::class, 'id', 'establishment_id');
    }
}
