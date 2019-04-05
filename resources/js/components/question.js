import React from 'react';
import { McqOptions } from './';

class Question extends React.Component {
    render() {
        const { question } = this.props;
        return (
            <div className="container pt-5">
                <h2>{question.question}</h2>
                <p>{question.description}</p>

                {question.type === 'mcq' && question.options && (
                    <div className="list-group">
                        <McqOptions options={JSON.parse(question.options)} question={question} />
                    </div>
                )}
            </div>
        );
    }
}

export default Question;
