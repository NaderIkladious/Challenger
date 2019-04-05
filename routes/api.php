<?php

Route::get('quizzes/{id}', 'QuizController@show');
Route::post('questions', 'QuestionController@store');
Route::post('questions/validate', 'QuestionController@check');
