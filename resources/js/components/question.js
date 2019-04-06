import React from 'react';

import { McqOptions, EssayQuestion, QuestionPagination, QuizNavigation } from './';

const Question = ({
  submissionId,
  question,
  questions,
  answer,
  answerDraft,
  result,
  handleChange,
  handleTextChange,
  saveDraftAnswer,
  nextQuestion,
  submitQuiz
}) => (
  <div className="question">
    <QuizNavigation submissionId={submissionId} questions={questions} />
    <div className="container pt-5">
      <h2>{question.question}</h2>
      <p>{question.description}</p>

      {question.type === 'mcq' && question.options && (
        <div className="list-group">
          <McqOptions
            options={JSON.parse(question.options)}
            question={question}
            answer={answer}
            handleChange={handleChange}
            result={result}
          />
        </div>
      )}

      {question.type === 'text' && (
        <EssayQuestion
          question={question}
          answer={answer}
          handleTextChange={handleTextChange}
          answerDraft={answerDraft}
          saveDraftAnswer={saveDraftAnswer}
        />
      )}

      {answer && (
        <QuestionPagination submissionId={submissionId} nextQuestionId={nextQuestion()} submitQuiz={submitQuiz} />
      )}
    </div>
  </div>
);

export default Question;
