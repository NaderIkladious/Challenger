import React from 'react';

class Question extends React.Component {
    render() {
        const { question } = this.props;
        return (
            <div>
                <h2>{question.question}</h2>
            </div>
        );
    }
}

export default Question;
