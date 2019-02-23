import React, { Component } from "react";
import "./App.css";
import * as userService from "../src/Services/userService";
import { Route, Switch, withRouter } from "react-router-dom";
import LogIn from "./Components/LogIn";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      currentUser: {}
    };
  }
  componentDidMount() {
    //this.getCurrentUser();
  }
  getCurrentUser = () => {
    userService
      .getCurrent()
      .then(this.getCurrentOnSuccess)
      .catch(this.GetCurrentOnError);
  };
  getcurrentOnSuccess = response => {
    debugger;
    console.log(response);
  };
  getcurrentOnError = response => {
    debugger;
    console.log(response);
  };
  render() {
    return (
      <Switch>
        <Route exact path="/login" render={props => <LogIn {...props} />} />
        <Route
          exact
          path="/dashboard"
          render={props => <Dashboard {...props} />}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
