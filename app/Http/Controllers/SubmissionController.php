<?php

namespace App\Http\Controllers;

use App\Submission;
use App\Quiz;
use Illuminate\Http\Request;
use Symfony\Component\Console\Question\Question;

class SubmissionController extends Controller
{

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
        $submission = Submission::with(['quiz', 'quiz.questions'])->find($id);

        if ($submission) {
            return $submission;
        } else {
            return response()->json('Submission not found!', 404);
        }
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
            $score = $this->calculateScore($submission);
            $submission->score = $score;
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

    /**
     * Calculate submission total score
     *
     * @param Submission $submission
     * @return Int The score of submission
     */
    private function calculateScore(Submission $submission)
    {
        $score = 0;
        $quiz = Quiz::with('questions')->find($submission->quiz_id);
        $answers = json_decode($submission->answers);
        foreach ($answers as $key => $value) {
            if (strpos($key, 'result-') > -1) {
                $score += (float)$value;
            }
        }
        $total = 0;
        foreach ($quiz->questions as $question) {
            $total += $question->score;
        }
        return round(100 * ($score / $total));
    }
}
