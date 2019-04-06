import React from 'react';
import Axios from 'axios';

import history from '../history';

class NewSubmission extends React.Component {
  state = {
    email: '',
    quiz: {}
  };

  componentDidMount() {
    const quizId = this.props.match.params.id;

    Axios.get(`/api/quizzes/${quizId}`).then(
      ({ data }) => {
        this.setState({ quiz: data });
      },
      ({ response }) => {
        if (response.status === 404) {
          history.push('/404');
        }
      }
    );
  }

  /**
   * Validate that email entered is valid
   */
  isValidEmail = () => {
    const { email } = this.state;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /**
   * Start the quiz and redirect to the submission page
   * @returns Void
   */
  startQuiz = () => {
    const quizId = this.props.match.params.id;
    if (quizId) {
      Axios.post('/api/submissions', {
        email: this.state.email,
        quiz_id: quizId
      }).then(
        ({ data }) => {
          history.push(`/submission/${data.id}`);
        },
        () => {
          alert('Something went wrong!, Please try again later');
        }
      );
    }
  };

  /**
   * Capture user input and save it the state
   * @param Event e The change event
   * @returns Void
   */
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { quiz } = this.state;
    return (
      <div className="container vh100 mx-5 d-flex align-items-center justify-content-center">
        <div className="p-5 bg-white border rounded text-center mx-5 w-50">
          <h3 className="mt-5">{quiz.title}</h3>
          <p className="">{quiz.description}</p>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </div>

          <button className="btn btn-success" onClick={this.startQuiz} disabled={!this.isValidEmail()}>
            Start Challenge
          </button>
        </div>
      </div>
    );
  }
}

export default NewSubmission;
