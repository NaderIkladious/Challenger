import React from 'react';

const McqOptions = ({ options, question }) => (
    <>
        {options.map(option => (
            <div key={option} className="form-check list-group-item mb-3 rounded p-0 d-flex align-items-center">
                <input
                    className="form-check-input ml-4 mt-0"
                    type="radio"
                    name={question.id}
                    id={`${question.id}-${option}`}
                    value={option}
                />
                <label className="form-check-label pl-5 d-block w-100 py-3" htmlFor={`${question.id}-${option}`}>
                    {option}
                </label>
            </div>
        ))}
    </>
);

export default McqOptions;
