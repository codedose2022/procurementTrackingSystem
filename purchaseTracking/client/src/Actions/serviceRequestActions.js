import _ from "lodash";
import * as api from "../api";
import responseStatusConstants from "../Constants/responseStatusCode";

export const getAllServiceRequests = (userId, token, errCallback) => async (dispatch) => {
  try {
    const { data } = await api.getServiceRequests({userId : userId}, token);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
     dispatch({ type: "ALL_REQUESTS", payload: data.serviceRequestsList});
    } else {
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};