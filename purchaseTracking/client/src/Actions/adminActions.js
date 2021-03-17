import _ from "lodash";
import * as api from "../api";
import responseStatusConstants from "../Constants/responseStatusCode";

export const getUsers = (token,errCallback) => async (dispatch) => {
  try {
    const { data } = await api.getUsers(token);
    const usersList = _.get(data, "users", []);
    dispatch({ type: "USERS_LIST", payload: usersList });
  } catch (error) {
    errCallback("Something went wrong, Please try again later.");
  }
};

export const deleteUser = (
  id,
  token,
  setErrorMessage,
  setShowSnackbar,
  setDisplaySnackbarText
) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(id, token);
    const deleteStatus = _.get(data, "status", "");
    const usersList = _.get(data, "users", []);
    if (deleteStatus === responseStatusConstants.SUCCESS) {
      dispatch({ type: "USERS_LIST", payload: usersList });
      setShowSnackbar(true);
      setDisplaySnackbarText(_.get(data, "message", ""));
    } else {
      setErrorMessage(_.get(data, "message", ""));
    }
  } catch (error) {
    setErrorMessage("Something went wrong, Please try again later.");
  }
};

export const createUser = (
  userData,
  token,
  setErrorMessage,
  handleDialogClose,
  setShowSnackbar,
  setDisplaySnackbarText
) => async (dispatch) => {
  try {
    const { data } = await api.createUser(userData, token);
    const createUserStatus = _.get(data, "status", "");
    const usersList = _.get(data, "users", []);
    if (createUserStatus === responseStatusConstants.SUCCESS) {
      dispatch({ type: "USERS_LIST", payload: usersList });
      setShowSnackbar(true);
      setDisplaySnackbarText(_.get(data, "message", ""));
      handleDialogClose();
    } else {
      setShowSnackbar(false);
      setErrorMessage(_.get(data, "message", ""));
    }
  } catch (error) {
    setErrorMessage("Something went wrong, Please try again later.");
  }
};
