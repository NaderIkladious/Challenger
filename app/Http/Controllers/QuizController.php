<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;

class QuizController extends Controller
{
    public function show($id)
    {
        $quiz = Quiz::with('questions')->find($id);

        if ($quiz) {
            return $quiz;
        } else {
            return response()->json('Quiz not found!', 404);
        }
    }
}
