import { Button, Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import serviceTypes from "../../../Constants/serviceTypes";
import useStyles from "./FormStyles";
import { createServiceRequests } from "../../../Actions/serviceRequestActions";
import { useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const AddRequest = (props) => {
  const classes = useStyles();
  let details = [];
  const dispatch = useDispatch();
  const [serviceState, setServiceState] = React.useState({});
  const [serviceErrors, setServiceErrors] = useState("");
  const handleChange = (e) => {
    setServiceErrors("");
    setServiceState({ ...serviceState, [e.target.name]: e.target.checked });
  };

  const handleSubmit = () => {
    setServiceErrors("");
    for (var key of Object.keys(serviceState)) {
      if (serviceState[key] === true) {
        details.push({ serviceCategory: key });
      }
    }

    const serviceData = {
      userId: props.user.userInfo._id,
      requestorName: props.user.userInfo.name,
      details: details,
    };
    if (details.length !== 0) {
      dispatch(
        createServiceRequests(
          serviceData,
          props.user.token,
          setServiceErrors,
          props.handleDialogClose,
          props.setShowSnackbar,
          props.setDisplaySnackbarText
        )
      );
    }
    else 
    {
      setServiceErrors("Please select at least one service type.")
    }
  };

  return (
    <>
      {serviceErrors && <Alert severity="error"> {serviceErrors} </Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            disabled
            id="name"
            name="name"
            label="Requestor Name"
            fullWidth
            value={props.user.userInfo.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {serviceTypes.map((service, index) => (
              <Grid item xs={3} key={index}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        name={service}
                      />
                    }
                    label={service}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttonStyle}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default AddRequest;
