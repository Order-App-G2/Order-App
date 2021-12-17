import { trackForMutations } from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../types";
  
  const user = JSON.parse(localStorage.getItem("user") as string);
  
  const userInitialState = user
    ? { isLoggedIn: true, user , type: ''}
    : { isLoggedIn: false, user: null };


    const initiallState = {
    
    }
  const allInitialState = userInitialState && initiallState


  export default function (state = userInitialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          type: payload.type
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }
  