import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Authentication, LoginAction } from '../../authentication';
import { EventManagement } from '../../organizer';
import { StringUtils } from "../../../utils";

function App(props) {

  useEffect(() => {
    //RUN WHEN APP MOUNTED, WHICH IS THE MOMENT USER TYPE ANY URL RELATED TO THIS APP AND PRESS ENTER
    //GET TOKEN FROM LOCAL STORAGE
    let token = "Bearer " + localStorage.getItem("token");

    //AXIOS CONFIGURATION
    axios.defaults.timeout = 30000;
    axios.defaults.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    axios.defaults.withCredentials = true;

    // this is used to intercept each time a request is sent to the server
    axios.interceptors.request.use(
      async (config) => {
        console.log("url>>>>: " + config.url);
        console.log(
          "interceptor request begin in Data Async... >>>>>>>>>>>>>>>> = ",
          "Bearer " + localStorage.getItem("token")
        );
        if (StringUtils.isEmpty(token)) {
          // do nothing
          // do

          console.log("ABCDEFGH in empty token");
        } else {
          config.headers.Authorization =
            "Bearer " + localStorage.getItem("token"); // chan ly.
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },

      async error => {
        return Promise.reject(error);
      }
    );

  }, []);

  useEffect(() => {
    props.dispatch(LoginAction.getToken("Bearer " + localStorage.getItem("token")));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/authentication" component={Authentication}>
          <Authentication />
        </Route>
        <Route path="/organizer/manage_event" component={EventManagement}>
          <EventManagement />
        </Route>
        {!StringUtils.isEmpty(props.token) ? null : <Redirect from="*" to="/authentication" />}
      </Switch>
    </Router>
  );
}

export default connect(state => ({
  token: state.AuthenticationReducer.token
}))(App)