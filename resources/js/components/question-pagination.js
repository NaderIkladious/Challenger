import React from 'react';
import { Link } from 'react-router-dom';

const QuestionPagination = ({ quizId, nextQuestionId }) =>
  nextQuestionId ? (
    <Link to={`/quiz/${quizId}/questions/${nextQuestionId}`} className="float-right btn btn-success">
      Next Question
    </Link>
  ) : (
    <div className="float-right">
      <Link to={`/quiz/${quizId}`} className="btn btn-secondary mr-2">
        Questions List
      </Link>
      <Link to={`/quiz/${quizId}`} className="btn btn-success">
        Submit Test
      </Link>
    </div>
  );

export default QuestionPagination;
