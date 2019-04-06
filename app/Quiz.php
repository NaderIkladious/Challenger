<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
	protected $fillable = ['title', 'description'];

	public function questions()
	{
		return $this->hasMany(Question::class);
	}

	// public function submissions()
	// {
	// 	return $this->hasMany(Submission::class);
	// }
}
