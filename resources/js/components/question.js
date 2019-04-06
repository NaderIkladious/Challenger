import React from 'react';

import { McqOptions, EssayQuestion, QuestionPagination } from './';

class Question extends React.Component {
  render() {
    const {
      quizId,
      question,
      answer,
      answerDraft,
      result,
      handleChange,
      handleTextChange,
      saveDraftAnswer,
      nextQuestion
    } = this.props;
    let nextQuestionId = nextQuestion();
    return (
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

        {answer && <QuestionPagination quizId={quizId} nextQuestionId={nextQuestionId} />}
      </div>
    );
  }
}

export default Question;
