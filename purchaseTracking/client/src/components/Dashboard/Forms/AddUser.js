import { Button, FormControl, MenuItem, TextField } from "@material-ui/core";
import { Formik, Form, ErrorMessage } from "formik";
import  React  from "react";
import { useDispatch } from "react-redux";

import { createUser } from "../../../Actions/adminActions";
import useStyles from "./FormStyles";
import * as Yup from "yup";

const AddUser = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    username: "",
    department: "",
  };
  const onSubmit = (values) => {
    props.setErrorMessage("");
    dispatch(
      createUser(
        values,
        props.user.token,
        props.setErrorMessage,
        props.handleDialogClose,
        props.setShowSnackbar,
        props.setDisplaySnackbarText
      )
    );
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be 3 characters or more")
      .max(30, "Must be 30 characters or less")
      .required("Name is required."),
    username: Yup.string()
      .email("Invalid email address")
      .required("Username is required."),
    department: Yup.string().required("Department is required."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Name"
              placeholder="John Doe"
              {...formik.getFieldProps("name")}
            />
            <div className={classes.Error}>
              <ErrorMessage name="name" />
            </div>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <TextField
              id="username"
              name="username"
              type="text"
              fullWidth
              label="Username"
              placeholder="johndoe@example.com"
              {...formik.getFieldProps("username")}
            />
            <div className={classes.Error}>
              <ErrorMessage name="username" />
            </div>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <TextField
              id="department"
              name="department"
              label="Department"
              fullWidth
              {...formik.getFieldProps("department")}
              select
            >
              <MenuItem value="Customer Relations">Customer Relations</MenuItem>
              <MenuItem value="Procurement">Procurement</MenuItem>
            </TextField>
            <div className={classes.Error}>
              <ErrorMessage name="department" />
            </div>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default AddUser;
