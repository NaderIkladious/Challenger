import React from 'react';
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import { Question, QuestionsList } from '../components';

class Quiz extends React.Component {
    state = {
        quiz: {},
        answers: {}
    };
    componentDidMount() {
        const quizId = this.props.match.params.id;
        Axios.get(`/api/quizzes/${quizId}`).then(({ data }) => {
            this.setState({ quiz: data });
        });
    }
    handleAnswer = e => {
        const { name, value } = e.target;
        this.setState({
            answers: {
                ...this.state.answers,
                [name]: value
            }
        });
    };
    handleInput = e => {
        const { name, value } = e.target;
        this.setState({
            answers: {
                ...this.state.answers,
                [`text-${name}`]: value
            }
        });
    };
    saveInput = input => {
        this.setState({
            answers: {
                ...this.state.answers,
                [input.replace('text-', '')]: this.state.answers[input]
            }
        });
    };
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
                            render={() => (
                                <Question
                                    question={question}
                                    answer={this.state.answers[question.id] || ''}
                                    answerDraft={this.state.answers[`text-${question.id}`] || ''}
                                    handleChange={this.handleAnswer}
                                    handleTextChange={this.handleInput}
                                    saveDraftAnswer={this.saveInput}
                                />
                            )}
                        />
                    ))}
            </div>
        );
    }
}

export default Quiz;
