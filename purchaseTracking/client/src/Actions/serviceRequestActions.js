import _ from "lodash";
import * as api from "../api";
import responseStatusConstants from "../Constants/responseStatusCode";

export const getAllServiceRequests = (userId, token, errCallback) => async (
  dispatch
) => {
  try {
    const { data } = await api.getServiceRequests({ userId: userId }, token);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      dispatch({ type: "ALL_REQUESTS", payload: data.serviceRequestsList });
    } else {
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};

export const createServiceRequests = (
  serviceData,
  token,
  errCallback,
  handleDialogClose,
  setShowSnackbar,
  setDisplaySnackbarText
) => async (dispatch) => {
  try {
    const { data } = await api.createServiceRequests(serviceData, token);
    const successStatusCd = _.get(data, "status", "");
    console.log(successStatusCd);
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      dispatch({ type: "ALL_REQUESTS", payload: data.serviceRequestsList });
      setShowSnackbar(true);
      setDisplaySnackbarText(_.get(data, "message", ""));
      handleDialogClose();
    } else {
      setShowSnackbar(false);
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};
