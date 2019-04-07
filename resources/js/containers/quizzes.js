import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../components';

class Quizzes extends React.Component {
  state = {
    quizzes: []
  };

  componentDidMount() {
    Axios.get(`/api/quizzes`).then(({ data }) => {
      this.setState({
        quizzes: data
      });
    });
  }

  render() {
    const { quizzes } = this.state;
    return (
      <div className="container mt-5">
        <h2>Latest case studies</h2>
        <div className="list-group">
          {quizzes && quizzes.length ? (
            quizzes.map(quiz => (
              <Link
                to={`/quiz/${quiz.id}`}
                className="list-group-item d-flex justify-content-between mb-3 rounded"
                key={quiz.id}
              >
                <p className="mb-0">{quiz.title}</p>
                <div className="d-flex">
                  <p className="mb-0 text-secondary">{quiz.questions_count} question(s)</p>
                </div>
              </Link>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

export default Quizzes;
