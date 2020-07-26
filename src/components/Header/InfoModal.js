import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./index.css";

function InfoModal(props) {
  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.onModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">About Tagluz</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div>Tagluz 0.91</div>
          <div>By Pitamer</div>
          <div>With lots of help from Ariel</div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onModalClose} color="primary" autoFocus>
          Nice :)
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoModal;
