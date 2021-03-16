import _ from "lodash";
import * as api from "../api";
import responseStatusConstants from "../Constants/responseStatusCode";
export const login = (loginData, callback, history) => async (dispatch) => {
  try {
    const { data } = await api.login(loginData);
    const loginStatus = _.get(data, "status", "");
    if (loginStatus === responseStatusConstants.SUCCESS) {
      localStorage.setItem("auth-token", data.token);
      dispatch({ type: "USER_INFO", payload: data });
      dispatch({ type: "LOGIN", payload: true });
      history.push("/dashboard");
    } else {
      callback(_.get(data, "message", ""));
    }
  } catch (error) {
    callback("Please try again later");
  }
};

export const sendResetLink = (username, errCallback, successCallBack) => async (
  dispatch
) => {
  try {
    const { data } = await api.sendResetLink({ username: username });
    if (data.status === responseStatusConstants.INVALID_EMAIL) {
      errCallback(data.message);
    } else {
      successCallBack(data.message);
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};

export const changePassword = (
  changePasswordData,
  callback,
  history,
  token
) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(changePasswordData, token);
    const status = _.get(data, "status", "");
    if (status === responseStatusConstants.SUCCESS) {
      history.push("/dashboard");
    } else {
      callback(_.get(data, "message", ""));
    }
  } catch (error) {
    callback("Please try again later");
  }
};
