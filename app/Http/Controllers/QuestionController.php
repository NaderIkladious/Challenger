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

    /**
     * Check if the score of the answered question
     *
     * @param Request $request
     * @return String the score of the answer
     */
    public function check(Request $request)
    {
        $validatedData = $request->validate([
            'id'      => 'required',
            'answer'   => 'required',
        ]);

        $question = Question::find($validatedData['id']);
        $score = 0;
        if ($question['type'] === 'mcq') {
            $answer = json_decode($question['answer']);
            $score = in_array($validatedData['answer'], $answer) ? $question['score'] : 0;
        } else if ($question['type'] === 'text') {
            $answer = json_decode($question['answer']);
            $scorePerWord = (float)$question['score'] / count($answer);
            $score = count(array_intersect($answer, explode(' ', $validatedData['answer']))) * $scorePerWord;
        }
        return response()->json($score, 200);
    }
}
