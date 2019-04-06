import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { Header } from './components';
import { Quizzes, Quiz, notFound, NewSubmission, Results } from './containers';

import history from './history';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={Quizzes} />
            <Route path="/404" component={notFound} />
            <Route path="/submission/:id" component={Quiz} />
            <Route path="/quiz/:id" component={NewSubmission} />
            <Route exact path="/results" render={() => <Redirect to="/" />} />
            <Route path="/results/:id" component={Results} />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
