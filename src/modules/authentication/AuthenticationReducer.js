/**
 * @author DucPL
 */

import LoginActionType from "./LoginActionType";

// a place to store common variables, and we change these vars by calling different Action functions.
const AuthenticationReducer = (
    state = {
        userName: "",
        email: "",
        userType: "",
        userId: "",
        address: "",
        dob: 0,
        blood_type: "",
        donation_requirement_data: {
            height: null,
            weight: null,
            gender: null,

            tattoo_last_12_month: null,
            cholesterol: null,
            positive_test_HIV: null,
            infectious_disease: null,
            cancer: null,
        },
        token: ""
    },
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case LoginActionType.LOGIN:
            return {
                ...state,
                userName: payload.name,
                email: payload.email,
                userId: payload.userId,
                userType: payload.userType,
                address: payload.address ? payload.address : state.address,
                dob: payload.dob ? payload.dob : state.dob,
                blood_type: payload.blood_type ? payload.blood_type : state.blood_type,
                donation_requirement_data: payload.donation_requirement_data ? payload.donation_requirement_data : state.donation_requirement_data
            };
        case LoginActionType.LOGOUT:
            return {
                ...state,
                userType: "",
                email: "",
                userId: "",
                userName: "",
                address: "",
                dob: 0,
                blood_type: "",
                donation_requirement_data: {
                    height: null,
                    weight: null,
                    gender: null,

                    tattoo_last_12_month: null,
                    cholesterol: null,
                    positive_test_HIV: null,
                    infectious_disease: null,
                    cancer: null,
                }
            };
        case LoginActionType.GET_TOKEN:
            return {
                ...state,
                token: payload.token
            }
        default:
            return state;
    }
};

export default AuthenticationReducer;
