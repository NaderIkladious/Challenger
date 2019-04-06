<?php

Route::get('quizzes/{id}', 'QuizController@show');
Route::get('quizzes', 'QuizController@index');

Route::post('questions', 'QuestionController@store');
Route::post('questions/validate', 'QuestionController@check');

Route::post('submissions', 'SubmissionController@store');
Route::get('submissions/{id}', 'SubmissionController@show');
Route::put('submissions/{id}', 'SubmissionController@update');
