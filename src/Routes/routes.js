import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import userListing from "../components/User_listing";
import addUser from "../components/Add_user";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/user-listing" />
          </Route>
          <Route exact path="/user-listing" component={userListing} />
          <Route exact path="/add-user" component={addUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
