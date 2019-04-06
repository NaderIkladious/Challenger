import React from 'react';
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import { Question, QuestionsList, QuizSubmitted } from '../components';
import history from '../history';

class Quiz extends React.Component {
  state = {
    quiz: {},
    answers: {},
    submission: {}
  };

  componentDidMount() {
    const submissionId = this.props.match.params.id;
    Axios.get(`/api/submissions/${submissionId}`).then(
      ({ data }) => {
        this.setState({
          quiz: data.quiz,
          answers: data.answers ? JSON.parse(data.answers) : {},
          submission: {
            id: data.id,
            email: data.email,
            submitted: Boolean(JSON.parse(data.submitted)),
            created_at: data.created_at,
            score: data.score
          }
        });
      },
      err => {
        if (err.response.status === 404) {
          history.push('/404');
        }
      }
    );
  }

  /**
   * Check the score of a specific question
   * @param String questionId The id of the question to check
   * @param String answer The question answer
   */
  checkAnswer = (id, answer, cb = false) => {
    Axios.post(`/api/questions/validate`, { id, answer }).then(({ data }) => {
      this.setState(
        {
          answers: {
            ...this.state.answers,
            [`result-${id}`]: parseFloat(data)
          }
        },
        () => {
          if (cb) {
            cb();
          }
        }
      );
    });
  };

  /**
   * Save input from radio button to the state
   * @param Object e Event object
   * @returns Void
   */
  handleAnswer = e => {
    const { name, value } = e.target;
    this.checkAnswer(name, value, () => {
      this.setState(
        {
          answers: {
            ...this.state.answers,
            [name]: value
          }
        },
        () => {
          this.updateAnswers();
        }
      );
    });
  };

  /**
   * Save input from textarea to the state
   * @param Object e Event object
   * @returns Void
   */
  handleInput = e => {
    const { name, value } = e.target;
    this.setState(
      {
        answers: {
          ...this.state.answers,
          [`text-${name}`]: value
        }
      },
      () => {
        this.updateAnswers();
      }
    );
  };

  /**
   * Update the answer submission
   * @returns Void
   */
  updateAnswers = () => {
    Axios.put(`/api/submissions/${this.state.submission.id}`, {
      answers: this.state.answers
    }).then(({ data }) => {
      console.log(data);
    });
  };

  /**
   * Return the next question ID
   * @returns Int The next question ID or 0 if last
   */
  nextQuestion = () => {
    let nextId = 0;
    const { quiz, answers } = this.state;

    quiz.questions.some(question => {
      if (!answers[question.id]) {
        nextId = question.id;
        return true;
      }
    });
    return nextId;
  };

  /**
   * Save draft esssay questions
   * @param String input The question id to save
   * @returns Void
   */
  saveInput = input => {
    let name = input.replace('text-', '');
    let value = this.state.answers[input];

    this.checkAnswer(name, value, () => {
      this.setState(
        {
          answers: {
            ...this.state.answers,
            [name]: value
          }
        },
        () => {
          this.updateAnswers();
        }
      );
    });
  };

  /**
   * Flag a submission as submitted
   * @returns Void
   */
  submitQuiz = () => {
    Axios.put(`/api/submissions/${this.state.submission.id}`, {
      submitted: true
    }).then(({ data }) => {
      this.setState({
        submission: {
          ...this.state.submission,
          submitted: true
        }
      });
      history.push(`/results/${this.state.submission.id}`);
    });
  };

  render() {
    const { quiz, answers, submission } = this.state;
    return (
      <div className="quiz">
        {submission && submission.submitted ? (
          <QuizSubmitted />
        ) : (
          <div>
            <Route
              path={`/submission/${submission.id}`}
              exact
              render={() => (
                <QuestionsList
                  submissionId={submission.id}
                  quizId={quiz.id}
                  quizTitle={quiz.title}
                  questions={quiz.questions}
                  answers={answers}
                  submitQuiz={this.submitQuiz}
                  nextQuestion={this.nextQuestion()}
                />
              )}
            />
            <Route
              path={`/submission/${submission.id}/questions`}
              exact
              render={() => <Redirect to={`/submission/${quiz.id}`} />}
            />
            {quiz.questions &&
              quiz.questions.map(question => (
                <Route
                  key={question.id}
                  path={`/submission/${submission.id}/questions/${question.id}`}
                  render={() => (
                    <Question
                      quizId={quiz.id}
                      submissionId={submission.id}
                      question={question}
                      questions={quiz.questions}
                      answer={this.state.answers[question.id] || ''}
                      answerDraft={this.state.answers[`text-${question.id}`] || ''}
                      result={this.state.answers[`result-${question.id}`]}
                      handleChange={this.handleAnswer}
                      handleTextChange={this.handleInput}
                      saveDraftAnswer={this.saveInput}
                      nextQuestion={this.nextQuestion}
                      submitQuiz={this.submitQuiz}
                    />
                  )}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
