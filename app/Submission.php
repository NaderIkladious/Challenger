<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = ['email', 'quiz_id'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
