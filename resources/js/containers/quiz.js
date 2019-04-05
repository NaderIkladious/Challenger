import React from 'react';
import Axios from 'axios';
import { Route } from 'react-router-dom';

import { Question } from '../components';

class Quiz extends React.Component {
    state = {
        quiz: {}
    };
    componentDidMount() {
        const quizId = this.props.match.params.id;
        Axios.get(`/api/quizzes/${quizId}`).then(({ data }) => {
            this.setState({ quiz: data });
        });
    }
    render() {
        const { quiz } = this.state;
        return (
            <div className="quiz">
                <h1>{quiz.title}</h1>
                {quiz.questions &&
                    quiz.questions.map(question => (
                        <Route
                            key={question.id}
                            path={`/quiz/${quiz.id}/question/${question.id}`}
                            render={() => <Question question={question} />}
                        />
                    ))}
            </div>
        );
    }
}

export default Quiz;
