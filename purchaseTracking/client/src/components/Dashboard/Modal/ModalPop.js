import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton
} from "@material-ui/core";
import Close from '@material-ui/icons/Close'
import React, { useState } from "react";
import useStyles from "./ModalPopStyles";

const ModalPop = ({ isOpen, handleClose, title, content, button }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
        {title}
          <IconButton color="secondary" size="small" onClick={handleClose}>
            <Close />
          </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPop;
