import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const QuizNavigation = ({ submissionId, questions }) => (
  <div className="quiz-navigation position-fixed bg-dark">
    <ul className="list-inline">
      <li>
        <Link
          to={`/submission/${submissionId}`}
          className="navigation-item d-flex align-items-center justify-content-center text-white"
        >
          All
        </Link>
      </li>
      {questions &&
        questions.map((question, idx) => (
          <li key={question.id}>
            <NavLink
              to={`/submission/${submissionId}/questions/${question.id}`}
              className="navigation-item d-flex align-items-center font-weight-bold justify-content-center text-white"
              activeClassName="active"
            >
              Q: {idx + 1}
            </NavLink>
          </li>
        ))}
    </ul>
  </div>
);

export default QuizNavigation;
