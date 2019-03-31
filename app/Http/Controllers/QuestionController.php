<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'question'      => 'required',
            'description'   => 'required',
            'type'          => 'required',
            'answer'        => 'required',
            'options'       => 'required',
            'quiz_id'       => 'required',
            'score'         => 'required'
        ]);


        $question = Question::create([
            'question' => $validatedData['question'],
            'description' => $validatedData['description'],
            'type' => $validatedData['type'],
            'score' => $validatedData['score'],
            'answer' => json_encode($validatedData['answer']),
            'options' => json_encode($validatedData['options']),
            'quiz_id' => $validatedData['quiz_id'],
        ]);

        return response()->json($question, 200);
    }
}
