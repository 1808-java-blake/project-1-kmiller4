import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ClickerComponent } from './components/clicker/clicker.component';
import { TicTacComponent } from './components/tic-tac/tic-tac.component';
import { ChuckNorrisComponent } from './components/chuck-norris/chuck-norris.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { ReimComponent } from './components/reim/reim.component';
import { NestedComponent } from './components/nested/nested.component';
import { AddReimComponent } from './components/add-reim.component/add-reim.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <div id="main-content-container">
            <Switch>
              <Route path="/first" component={FirstComponent} />
              <Route path="/second" component={SecondComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/clicker" component={ClickerComponent} />
              <Route path="/tic-tac-toe" component={TicTacComponent} />
              <Route path="/chuck-norris" component={ChuckNorrisComponent} />
              <Route path="/pokemon" component={PokemonComponent} />
              <Route path="/reim" component={ReimComponent} />
              <Route path="/add-reim" component={AddReimComponent} />
              <Route path="/nested" component={NestedComponent} />
              <Route component={HomeComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
