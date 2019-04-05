import React from 'react';
import { Link } from 'react-router-dom';

import { McqOptions } from './';

class Question extends React.Component {
    render() {
        const { question, answer, answerDraft, handleChange, handleTextChange, saveDraftAnswer } = this.props;
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
                        />
                    </div>
                )}

                {question.type === 'text' && question.options && (
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
                )}
            </div>
        );
    }
}

export default Question;
