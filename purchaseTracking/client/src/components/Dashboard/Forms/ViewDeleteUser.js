import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import useStyles from "./FormStyles";
import { deleteUser } from "../../../Actions/adminActions";

const ViewDeleteUser = ({
  avatarLetter,
  firstName,
  username,
  department,
  id,
  user,
  setErrorMessage,
  setShowSnackbar,
  setDisplaySnackbarText,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleUserDelete = () => {
    setOpen(false);
    setErrorMessage("");
    dispatch(
      deleteUser(
        { id },
        user.token,
        setErrorMessage,
        setShowSnackbar,
        setDisplaySnackbarText
      )
    );
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container className={classes.userList}>
        <Grid item md={2}>
          <Avatar>{avatarLetter}</Avatar>
        </Grid>
        <Grid item md={4}>
          <Typography color="secondary">{firstName}</Typography>
          <Typography color="secondary"className={classes.userName}>{username}</Typography>
        </Grid>
        <Grid item md={5}>
          <Typography color="secondary">{department}</Typography>
        </Grid>
        <Grid item md={1}>
          <IconButton
            className={classes.deleteUser}
            size="small"
            onClick={handleConfirmDelete}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
      <hr />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{borderBottom: '1px solid #ddd'}}>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUserDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewDeleteUser;
