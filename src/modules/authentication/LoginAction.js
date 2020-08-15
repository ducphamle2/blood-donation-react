import loginActionType from './LoginActionType'

// an object which contains different functions that pass type and payload params for reducers
const LoginAction = {
    logIn: payload => ({ type: loginActionType.LOGIN, payload }),
    logOut: () => ({ type: loginActionType.LOGOUT }),
    getToken: payload => ({ type: loginActionType.GET_TOKEN, payload })
}

export default LoginAction;