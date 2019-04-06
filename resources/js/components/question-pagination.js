import React from 'react';
import { Link } from 'react-router-dom';

const QuestionPagination = ({ submissionId, nextQuestionId, submitQuiz }) =>
  nextQuestionId ? (
    <Link to={`/submission/${submissionId}/questions/${nextQuestionId}`} className="float-right btn btn-success">
      Next Question
    </Link>
  ) : (
    <div className="float-right">
      <Link to={`/submission/${submissionId}`} className="btn btn-secondary mr-2">
        Questions List
      </Link>
      <button to={`/submission/${submissionId}`} className="btn btn-success" onClick={submitQuiz}>
        Submit Test
      </button>
    </div>
  );

export default QuestionPagination;
