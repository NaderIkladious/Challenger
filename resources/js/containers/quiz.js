import React from 'react';
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import { Question, QuestionsList } from '../components';

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
                <Route
                    path={`/quiz/${quiz.id}`}
                    exact
                    render={() => <QuestionsList quizId={quiz.id} quizTitle={quiz.title} questions={quiz.questions} />}
                />
                <Route path={`/quiz/${quiz.id}/questions`} exact render={() => <Redirect to={`/quiz/${quiz.id}`} />} />
                {quiz.questions &&
                    quiz.questions.map(question => (
                        <Route
                            key={question.id}
                            path={`/quiz/${quiz.id}/questions/${question.id}`}
                            render={() => <Question question={question} />}
                        />
                    ))}
            </div>
        );
    }
}

export default Quiz;
