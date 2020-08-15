import React, { Component, useEffect, useState } from "react";
import { Provider, connect } from "react-redux";
import api from "../../../shared/Api";
import axios from "axios";
//import loginAction from "../../redux/actions/loginAction";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink,
  Redirect
} from "react-router-dom";
import { Layout, Button, TextField, FormLayout, Form, ChoiceList, AppProvider, Toast, Frame } from '@shopify/polaris';

import { Login } from '../../authentication';
import { Home } from '../';
import LoginAction from "../../authentication/LoginAction";
import StringUtils from "../../../utils/StringUtils";

// You can think of these components as "pages"
// in your app.

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {

  // match variable is added as props for this component when it is called by Route (above)
  let match = useRouteMatch();

  console.log("match: ", match);

  return (
    <div>
      <h2>Dashboard</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v: state</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:itemId`}>
          <Item />
        </Route>
        <Route path={match.path}>
          <h3>Please select an item. {match.path}</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Item() {
  let { itemId } = useParams();
  return <h2>Requested item: {itemId}</h2>
}

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

    // //GET USER INFO FROM SERVER TO CHECK IF AUTH TOKEN IS VALID
    // api.getUserInfo((isSuccess, response, error) => {
    //     console.log("app.js | getUserInfo | isSuccess: " + isSuccess);
    //     if (isSuccess) {
    //         //GOOD TOKEN
    //         console.log("GetUserData success", response);
    //         let payload = {
    //             name: response.data.data.name,
    //             email: response.data.data.email,
    //             userId: response.data.data.userId,
    //             userType: response.data.data.role
    //         };


    //         //HANDLE DATA FOR DONOR
    //         if (response.data.data.address) payload.address = response.data.data.address;
    //         if (response.data.data.dob) payload.dob = response.data.data.dob;
    //         if (response.data.data.blood_type) payload.blood_type = response.data.data.blood_type;

    //         //ADDITIONAL DATA
    //         if (payload.userType === "donor") {
    //             payload.donation_requirement_data = {};
    //             payload.donation_requirement_data.height = response.data.data.height;
    //             payload.donation_requirement_data.weight = response.data.data.weight;
    //             payload.donation_requirement_data.gender = response.data.data.gender;
    //             payload.donation_requirement_data.tattoo_last_12_month = response.data.data.tattoo_last_12_month;
    //             payload.donation_requirement_data.cholesterol = response.data.data.cholesterol;
    //             payload.donation_requirement_data.positive_test_HIV = response.data.data.positive_test_HIV;
    //             payload.donation_requirement_data.infectious_disease = response.data.data.infectious_disease;
    //             payload.donation_requirement_data.cancer = response.data.data.cancer;
    //         }

    //         //SET DATA
    //         store.dispatch(loginAction.logIn(payload));
    //     } else {
    //         Router.push("/").then(() => {
    //             //BAD TOKEN, ROUTE BACK TO SIGN IN PAGE
    //             console.log("Route successfully from 'any' to '/' due to authentication failed");
    //         });
    //     }
    // })
  }, []);

  useEffect(() => {
    props.dispatch(LoginAction.getToken("Bearer " + localStorage.getItem("token")));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}>
          <Login />
        </Route>
        <Route path="/home" component={Home}>
          <Home />
        </Route>
        {!StringUtils.isEmpty(props.token) ? null : <Redirect from="*" to="/login" />}
      </Switch>
    </Router>
  );
}

export default connect(state => ({
  token: state.AuthenticationReducer.token
}))(App)