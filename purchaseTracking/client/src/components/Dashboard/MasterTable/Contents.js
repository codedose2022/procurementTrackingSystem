import React, { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import useStyles from "./masterTableStyles";
import DisplayComments from "./DisplayComments";

export default function Contents(props) {
  const decision = props.contentDetail.field;
  const title = props.contentDetail.headerName;
  const editable = props.contentDetail.isEditable;
  const classes = useStyles();
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
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      {editable && (
        <form>
          {decision === "status" && (
            <>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="status"
                  name="status"
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
                <TextField label={title} type="text" />
              </FormControl>
            </>
          )}
          <Grid container className={classes.modalButton}>
            <Grid item>
              <Button variant="contained" color="primary">
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
          decision = "comments"
        />
      )}
      {!editable && decision === "requesterUpdate" && (
         <DisplayComments
         serviceRequestList={props.serviceRequestList}
         contentDetail={props.contentDetail}
         decision = "requesterUpdate"
       />
      )}
    </>
  );
}
