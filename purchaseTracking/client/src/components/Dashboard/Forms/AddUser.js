import React from "react";
import { Formik } from "formik";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as Yup from "yup";
import useStyles from "./FormStyles";

const AddUser = () => {
  const classes = useStyles();


  return (
    <Formik
      initialValues={{ firstName: "", userName: "", department: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .min(3, "Name must be 3 characters or more")
          .max(15, "Must be 15 characters or less")
          .required("Name should not be empty"),
        userName: Yup.string()
          .email('Invalid email address')
          .required("Username should not be empty"),
        department: Yup.string()
          .required("Department is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              id="firstName"
              type="text"
              label="Name"
              placeholder="John Doe"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className={classes.Error}>{formik.errors.firstName}</div>
            ) : null}
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <TextField
              id="userName"
              type="text"
              fullWidth
              label="Username"
              placeholder="Johndoe@example.com"
              {...formik.getFieldProps("userName")}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className={classes.Error}>{formik.errors.userName}</div>
            ) : null}
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...formik.getFieldProps("department")}
            >
              <MenuItem value={'Customer relations'}>Customer relations</MenuItem>
              <MenuItem value={'Procurement'}>Procurement</MenuItem>              
            </Select>
            {formik.touched.department && formik.errors.department ? (
              <div className={classes.Error}>{formik.errors.department}</div>
            ) : null}
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      )}
    </Formik>
  );
};

export default AddUser;
