import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReimComponent } from './components/reim/reim.component';
import { AddReimComponent } from './components/add-reim.component/add-reim.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <div id="main-content-container">
            <Switch>
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/reim" component={ReimComponent} />
              <Route path="/add-reim" component={AddReimComponent} />
              <Route component={SignInComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
