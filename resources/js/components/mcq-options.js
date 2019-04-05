import React from 'react';

const McqOptions = ({ options, question, answer, result, handleChange }) => (
  <>
    {options.map(option => (
      <div key={option} className="form-check list-group-item mb-3 rounded p-0 d-flex align-items-center">
        <input
          className={`form-check-input ml-4 mt-0`}
          type="radio"
          name={question.id}
          id={`${question.id}-${option}`}
          value={option}
          onChange={handleChange}
          checked={answer === option}
          disabled={answer}
        />
        <label className="form-check-label pl-5 d-block w-100 py-3" htmlFor={`${question.id}-${option}`}>
          {option}
          <span className="ml-4">
            {answer && answer === option ? (
              result > 0 ? (
                <span className="badge badge-success p-2">Right Answer</span>
              ) : (
                <span className="badge badge-danger p-2">Wrong Answer!</span>
              )
            ) : (
              ''
            )}
          </span>
        </label>
      </div>
    ))}
  </>
);

export default McqOptions;
