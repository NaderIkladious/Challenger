import React from 'react';

import { McqOptions, EssayQuestion, QuestionPagination, QuizNavigation } from './';

class Question extends React.Component {
  render() {
    const {
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
    } = this.props;
    let nextQuestionId = nextQuestion();
    return (
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

          {question.type === 'text' && question.options && (
            <EssayQuestion
              question={question}
              answer={answer}
              handleTextChange={handleTextChange}
              answerDraft={answerDraft}
              saveDraftAnswer={saveDraftAnswer}
            />
          )}

          {answer && (
            <QuestionPagination submissionId={submissionId} nextQuestionId={nextQuestionId} submitQuiz={submitQuiz} />
          )}
        </div>
      </div>
    );
  }
}

export default Question;
