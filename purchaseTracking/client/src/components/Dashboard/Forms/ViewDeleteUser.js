import { Grid, Avatar, Typography, IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useStyles from "./FormStyles";
import { deleteUser } from "../../../Actions/adminActions";

const ViewDeleteUser = ({
  avatarLetter,
  firstName,
  username,
  department,
  id,
  user,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleUserDelete = () => {
    dispatch(
      deleteUser({ id }, user.token, setSuccessMessage, setErrorMessage)
    );
  };

  return (
    <>
      <Grid container className={classes.userList}>
        <Grid item md={2}>
          <Avatar>{avatarLetter}</Avatar>
        </Grid>
        <Grid item md={4}>
          <Typography>{firstName}</Typography>
          <Typography className={classes.userName}>{username}</Typography>
        </Grid>
        <Grid item md={5}>
          <Typography>{department}</Typography>
        </Grid>
        <Grid item md={1}>
          <IconButton
            className={classes.deleteUser}
            size="small"
            onClick={handleUserDelete}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
      <hr />
    </>
  );
};

export default ViewDeleteUser;
