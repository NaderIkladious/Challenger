<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Quiz;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Quiz::withCount('questions')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title'      => 'required',
            'description'   => 'required',
        ]);

        $quiz = Quiz::create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
        ]);

        return response()->json($quiz, 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
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
