import React from 'react';
import { Link } from 'react-router-dom';

import { McqOptions, EssayQuestion } from './';

class Question extends React.Component {
  render() {
    const { question, answer, answerDraft, result, handleChange, handleTextChange, saveDraftAnswer } = this.props;
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
      </div>
    );
  }
}

export default Question;
