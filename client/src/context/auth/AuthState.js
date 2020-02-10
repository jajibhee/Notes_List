import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"), // check out local storage and get our token
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  //dispatch allows us dispatch objects to the reducer.
  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user: check which user is logged
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    //Load token into global headers

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
    console.log("Load user");
  };

  //register user
  const register = async formData => {
    console.log("submitted ");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //login user
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //log out
  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
