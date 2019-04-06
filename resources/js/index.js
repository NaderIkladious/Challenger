import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';

import { Header } from './components';
import { Quiz, notFound } from './containers';

import history from './history';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/404" component={notFound} />
            <Route path="/submission/:id" component={Quiz} />
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
