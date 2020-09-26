import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from '../../../shared';
import { LoginAction } from '../';
import { Button, TextField, ChoiceList, AppProvider, Toast, Frame } from '@shopify/polaris';
import './authentication.css';
import { StringUtils, AuthenRouteUtils } from "../../../utils";

export default function Login(props) {

  // history is used to redirect routing
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isLoginPage, setIsLoginPage] = useState("");
  const [activeToast, setActiveToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleChangeChoiceList = (value) => {
    setUserType(value[0])
  }

  // // Route to a specific home screen of a module if the userName props changes (it means that we have fetched the data from the login api successfully)
  // useEffect(() => {
  //   let route = AuthenticationRouteUtils.stringRouteByRole(userType);
  //   console.log("prepare to route from /login to " + route);
  //   history.push(route);
  // }, [props.userName])

  const handleLogin = async () => {
    // EVALUATE THE INPUTS
    let isEmptyEmail = StringUtils.isEmpty(email);
    let isEmptyPassword = StringUtils.isEmpty(password);
    let isEmail = StringUtils.isEmail(email);
    if (!isEmptyEmail && !isEmptyPassword && isEmail && password.length >= 6) {
      setLoginErrorMessage("")
      let payload = {
        email: email,
        password: password,
        role: userType
      };
      await Api.login(payload, onHandleLogin)
    } else {
      if (isEmptyEmail || isEmptyPassword)
        setLoginErrorMessage("You need to fill in all the information needed");
      else if (!isEmail)
        setLoginErrorMessage("Wrong email format");
      else if (password.length < 6) {
        setLoginErrorMessage("Password length is too short");
      }
    }
  }

  const onHandleLogin = (isSuccess, response, error) => {
    if (isSuccess) {
      console.log("response data: ", response);
      let user = response.data.returnedUser;
      let payload = {
        userType: userType,
        userId: user.userId,
        name: user.name,
        email: user.email
      };

      //HANDLE DATA FOR DONOR
      if (user.address) payload.address = user.address;
      if (user.dob) payload.dob = user.dob;
      if (user.blood_type) payload.blood_type = user.blood_type;

      //ADDITIONAL DATA
      if (payload.userType === "donor") {
        payload.donation_requirement_data = {};
        payload.donation_requirement_data.height = user.height;
        payload.donation_requirement_data.weight = user.weight;
        payload.donation_requirement_data.gender = user.gender;
        payload.donation_requirement_data.tattoo_last_12_month = user.tattoo_last_12_month;
        payload.donation_requirement_data.cholesterol = user.cholesterol;
        payload.donation_requirement_data.positive_test_HIV = user.positive_test_HIV;
        payload.donation_requirement_data.infectious_disease = user.infectious_disease;
        payload.donation_requirement_data.cancer = user.cancer;
      }

      localStorage.setItem("token", response.data.token);
      props.dispatch(LoginAction.logIn(payload));
      let route = AuthenRouteUtils.stringRouteByRole(userType);

      console.log("prepare to route from /login to " + route);
      history.push(route);

    } else {
      console.log("ERROR========================================");
      if (error.response) {
        console.log("response data: " + error.response.data.message || error.response.data.error);

        // UNEXPECTED ERROR GOES HERE
        if (error.response.status === 500)
          setLoginErrorMessage("There is something wrong with the server");

        // PREDICTED ERRORS THAT HAVE ALREADY BEEN HANDLED FROM THE SERVER
        else
          setLoginErrorMessage(error.response.data.error || error.response.data.message);
      }
    }
  }

  const handleRegister = async () => {
    // EVALUATE THE INPUTS
    let isEmptyUserName = StringUtils.isEmpty(userName);
    let isEmptyEmail = StringUtils.isEmpty(email);
    let isEmptyPassword = StringUtils.isEmpty(password);
    let isEmptyConfirmPassword = StringUtils.isEmpty(confirmPassword);
    let isEmail = StringUtils.isEmail(email);

    if (isEmptyEmail || isEmptyPassword || isEmptyConfirmPassword || isEmptyUserName)
      setLoginErrorMessage("You need to fill in all the information needed");
    else if (!isEmail)
      setLoginErrorMessage("Wrong email format");
    else if (password.length < 6)
      setLoginErrorMessage("Password length is too short");
    else if (password !== confirmPassword)
      setLoginErrorMessage("Password does not match");
    else {
      //EVERYTHING IS OK, API REQUEST
      setLoginErrorMessage("");
      let payload = {
        name: userName,
        email: email,
        password: password,
        role: userType
      };
      await Api.register(payload, onHandleRegister)
    }
  }

  const onHandleRegister = (isSuccess, response, error) => {
    if (isSuccess) setToastMessage("Register successfully");
    else {
      try {
        setLoginErrorMessage(error.response.data.error.toString())
      } catch (err) {
        setLoginErrorMessage("Unexpected Error, check your internet connection")
      }
    }
  }

  const routeHelloWorld = () => {
    setIsLoginPage(false);
    setLoginErrorMessage("")
  }

  const routeSignIn = () => {
    setIsLoginPage(true);
    setLoginErrorMessage("")
  }

  const toggleActiveToast = () => setActiveToast(!activeToast);

  const ToastSuccessUpdateProfile = activeToast ? (
    <Toast content={toastMessage} onDismiss={toggleActiveToast} />
  ) : null;

  const theme = {
    colors: {
      surface: '#111213',
      onSurface: '#111213',
      interactive: '#DE3618',
      secondary: '#111213',
      primary: '#DE3618',
      critical: '#d82c0d',
      warning: '#ffc453',
      highlight: '#DE3618',
      success: '#008060',
      decorative: '#ffc96b',
    }
  };

  return (
    <AppProvider theme={theme} features={{ newDesignLanguage: true }}>
      {/* <Head>
        <title>{"Welcome - Blood Donation"}</title>
      </Head> */}
      <Frame>
        <div className="container">
          <div className="login-image">
          </div>
          <div className="login-form">
            <p className="login-title">
              Blood donation system
                </p>
            {
              !isLoginPage ?
                <TextField
                  placeholder="Full Name"
                  value={userName}
                  error={!isLoginPage ? loginErrorMessage : null}
                  onChange={(txt) => {
                    setUserName(txt);
                    setLoginErrorMessage("")
                  }} />
                : null
            }
            {!isLoginPage ? <br /> : null}
            <TextField
              placeholder="Email"
              value={email}
              error={isLoginPage ? loginErrorMessage : null}
              onChange={(txt) => {
                setEmail(txt);
                setLoginErrorMessage("");
              }} />
            <br />
            <TextField
              placeholder="Password"
              type="password"
              value={password}
              onChange={(txt) => {
                setPassword(txt);
                setLoginErrorMessage("");
              }} />
            <br />
            {
              !isLoginPage ?
                <TextField
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(txt) => {
                    setConfirmPassword(txt);
                    setLoginErrorMessage("");
                  }} />
                : null
            }
            {!isLoginPage ? <br /> : null}
            <ChoiceList
              title="Tell us who you are"
              choices={[
                { label: 'Donor', value: 'donor' },
                { label: 'Organizer', value: 'organizer' },
                { label: 'Red-cross', value: 'red_cross' },
                { label: 'Hospital', value: 'hospital' },
              ]}
              selected={userType}
              onChange={handleChangeChoiceList}
            />
            <br />
            <Button primary onClick={isLoginPage ? handleLogin : handleRegister}>
              {isLoginPage ? "Login" : "Register"}
            </Button>
            <p className="sign-up">
              {isLoginPage ? "Do not have an account ? " : "Already have an account ? "}
              <a onClick={isLoginPage ? routeHelloWorld : routeSignIn}>
                {isLoginPage ? "Sign up" : "Sign in"}
              </a>
            </p>

          </div>
        </div>
        {ToastSuccessUpdateProfile}
      </Frame>
    </AppProvider>
  );
}