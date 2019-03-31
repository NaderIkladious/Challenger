<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['question', 'description', 'type', 'answer', 'score', 'quiz_id'];
}
