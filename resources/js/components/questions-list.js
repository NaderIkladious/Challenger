import React from 'react';
import { Link } from 'react-router-dom';

import { QuestionTypeMap } from '../core/consts';

const QuestionsList = ({ questions, quizTitle, quizId, answers }) => (
  <div className="container pt-5">
    <h1>{quizTitle}</h1>
    <div className="list-group">
      {questions &&
        questions.map(question => (
          <Link
            to={`/quiz/${quizId}/questions/${question.id}`}
            className="list-group-item d-flex justify-content-between mb-4 rounded"
            key={question.id}
          >
            <p className="mb-0">{question.question}</p>
            <div className="d-flex">
              {answers && answers[question.id] && <span className="badge badge-success p-2 mr-2">Answered</span>}
              <p className="mb-0 text-secondary">{QuestionTypeMap[question.type]}</p>
            </div>
          </Link>
        ))}
    </div>
  </div>
);

export default QuestionsList;
