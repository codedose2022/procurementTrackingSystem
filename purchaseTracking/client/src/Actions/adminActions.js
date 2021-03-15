import _ from "lodash";
import * as api from "../api";
import responseStatusConstants from "../Constants/responseStatusCode";

export const getUsers = (token) => async (dispatch) => {
  try {
    const { data } = await api.getUsers(token);
    const usersList = _.get(data, "users", []);
    dispatch({ type: "USERS_LIST", payload: usersList });
  } catch (error) {
    console.log("Error");
  }
};

export const deleteUser = (id, token, setSuccessMessage,setErrorMessage) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(id, token);
    const deleteStatus = _.get(data, "status", "");
    const usersList = _.get(data, "users", []);
    if (deleteStatus === responseStatusConstants.SUCCESS) {
      dispatch({ type: "USERS_LIST", payload: usersList });
      setSuccessMessage(_.get(data, "message", ""));
    } else {
      setErrorMessage(_.get(data, "message", ""));
    }
  } catch (error) {
    setErrorMessage("Something went wrong, Please try again later.");
  }
};

export const createUser = (userData, token, setSuccessMessage,setErrorMessage,handleDialogClose) => async (
  dispatch
) => {
  try {
    const { data } = await api.createUser(userData, token);
    const createUserStatus = _.get(data, "status", "");
    const usersList = _.get(data, "users", []);
    if (createUserStatus === responseStatusConstants.SUCCESS) {
      dispatch({ type: "USERS_LIST", payload: usersList });
      setSuccessMessage(_.get(data, "message", ""))
      handleDialogClose();
    } else {
      setErrorMessage(_.get(data, "message", ""));
    }
  } catch (error) {
    setErrorMessage("Something went wrong, Please try again later.");
  }
};
