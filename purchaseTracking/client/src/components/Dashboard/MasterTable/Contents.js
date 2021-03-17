import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import useStyles from "./masterTableStyles";
import DisplayComments from "./DisplayComments";
import { useDispatch } from "react-redux";
import { updateServiceRequests } from "../../../Actions/serviceRequestActions";

export default function Contents(props) {
  const decision = props.contentDetail.field;
  const title = props.contentDetail.headerName;
  const editable = props.contentDetail.isEditable;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [serviceErrors, setServiceErrors] = useState("");
  const reqList = props.serviceRequestList.filter(
    (req) => req._id === props.contentDetail.serviceRequestId
  );
  const detail = reqList[0].details.filter(
    (item) => item._id === props.contentDetail.detailsId
  );
  const radioItems = [
    "New",
    "Logged",
    "Vendor selecting",
    "RFQ sent",
    "Under comparison",
    "Task done",
    "Under revision",
    "PO issued",
    "Requester assistance",
  ];

  const [value, setValue] = useState(detail[0].status);
  const [updateFieldValue, setUpdateFieldValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = {};
    if (["reply", "comments"].includes(decision)) {
      response = {
        [decision]: {
          [decision]: updateFieldValue,
        },
      };
    } else if (decision === "status") {
      response = {
        [decision]: value,
      };
    } else {
      response = {
        [decision]: updateFieldValue,
      };
    }

    dispatch(
      updateServiceRequests(
        response,
        props.token,
        props.contentDetail.serviceRequestId,
        props.contentDetail.detailsId,
        props.userId,
        setServiceErrors
      )
    );
    if (serviceErrors === "") {
      props.showSnackbar(true);
      props.handleClose();
    }
  };

  return (
    <>
      {editable && (
        <form onSubmit={handleSubmit}>
          {decision === "status" && (
            <>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='status'
                  name='status'
                  value={value}
                  onChange={handleChange}
                >
                  <Grid container className={classes.selectStatus}>
                    {radioItems.map((item, index) => {
                      return (
                        <Grid item md={6} key={index}>
                          <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </>
          )}
          {decision !== "status" && (
            <>
              <FormControl fullWidth>
                <TextField
                  label={title}
                  type='text'
                  value={updateFieldValue}
                  onChange={(e) => setUpdateFieldValue(e.target.value)}
                />
              </FormControl>
            </>
          )}
          <Grid container className={classes.modalButton}>
            <Grid item>
              <Button variant='contained' color='primary' type='submit'>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      {!editable && decision === "comments" && (
        <DisplayComments
          serviceRequestList={props.serviceRequestList}
          contentDetail={props.contentDetail}
          decision='comments'
        />
      )}
      {!editable && decision === "reply" && (
        <DisplayComments
          serviceRequestList={props.serviceRequestList}
          contentDetail={props.contentDetail}
          decision='reply'
        />
      )}
    </>
  );
}
