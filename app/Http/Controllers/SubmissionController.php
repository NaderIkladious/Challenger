<?php

namespace App\Http\Controllers;

use App\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'email'      => 'required',
            'quiz_id'   => 'required',
        ]);

        $submission = Submission::create([
            'email' => $validatedData['email'],
            'quiz_id' => $validatedData['quiz_id'],
        ]);

        return response()->json($submission, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Submission  $submission
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Submission::with(['quiz', 'quiz.questions'])->find($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Submission  $submission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $submission = Submission::find($id);

        $answers = $request->input('answers');
        if ($answers) {
            $submission->answers = json_encode($answers);
        }

        $submitted = $request->input('submitted');
        if (isset($submitted)) {
            $submission->submitted = $submitted;
        }

        $submission->save();
        return response()->json($submission, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Submission  $submission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Submission $submission)
    {
        //
    }
}
