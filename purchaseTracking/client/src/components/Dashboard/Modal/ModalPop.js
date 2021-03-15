import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton
} from "@material-ui/core";
import Close from '@material-ui/icons/Close'
import React from "react";
import useStyles from "./ModalPopStyles";

const ModalPop = ({ isOpen, handleClose, title, content }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      disableBackdropClick
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.modalTitle}>
        {title}
          <IconButton color="secondary" size="small" onClick={handleClose}>
            <Close />
          </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-content" component="div">
          {content}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPop;
