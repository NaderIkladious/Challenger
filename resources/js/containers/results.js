import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import history from '../history';

class Results extends React.Component {
  state = {
    score: ''
  };

  componentDidMount() {
    const submissionId = this.props.match.params.id;
    Axios.get(`/api/submissions/${submissionId}`).then(
      ({ data }) => {
        if (data.score && data.submitted) {
          this.setState({
            score: data.score
          });
        } else {
          history.push('/404');
        }
      },
      err => {
        if (err.response.status === 404) {
          history.push('/404');
        }
      }
    );
  }

  render() {
    const { score } = this.state;
    return (
      <div className="container vh100 mx-5 d-flex align-items-center justify-content-center">
        <div className="p-5 bg-white border rounded text-center mx-5 w-50">
          <h1 className="mt-5">Congratulations!</h1>
          <h2 className="text-success">{score}%</h2>
          <p>
            You can check the latest case studies <Link to="/">here</Link> if you want to practice more.
          </p>
        </div>
      </div>
    );
  }
}

export default Results;
