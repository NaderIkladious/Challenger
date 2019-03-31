<?php

Route::get('quizzes/{id}', 'QuizController@show');
Route::post('questions', 'QuestionController@store');
