import React from 'react';

const EssayQuestion = ({ question, answer, handleTextChange, answerDraft, saveDraftAnswer }) => (
  <div>
    <div className="form-group">
      <textarea
        className="form-control"
        name={question.id}
        answer={answer}
        rows="3"
        placeholder="Your Answer"
        onChange={handleTextChange}
        value={answer || answerDraft || ''}
        disabled={answer.length}
      />
    </div>
    <button
      type="submit"
      className="btn btn-primary mb-2"
      onClick={() => saveDraftAnswer(`text-${question.id}`)}
      disabled={!answerDraft || answer}
    >
      Submit
    </button>
  </div>
);

export default EssayQuestion;
