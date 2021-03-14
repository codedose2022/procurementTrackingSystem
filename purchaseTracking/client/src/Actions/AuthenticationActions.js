import _ from "lodash";
import * as api from "../api";
import responseStatusConstants from '../Constants/responseStatusCode';
import { Redirect } from 'react-router-dom';

export const login = (loginData, callback) => async (dispatch) => {
  try {
    const { data } = await api.login(loginData);
    const loginStatus = _.get(data, "status", "");
    if (loginStatus === responseStatusConstants.SUCCESS) {
      localStorage.setItem("auth-token", data.token);
      dispatch({ type: "USER_INFO", payload: data });
      
    } else {
      callback(_.get(data, "message", ""));
    }
  } catch (error) {
    console.log(error.message);
  }
};