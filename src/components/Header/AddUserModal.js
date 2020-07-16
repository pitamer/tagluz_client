import React from "react";
// import { useStoreState/*, useStoreActions*/ } from "easy-peasy";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";

import './index.css'

const AddUserModal = (props) => {
  const [value, setValue] = React.useState('');

  function makeUser() {
    const body = { name: value };
    fetch("http://localhost:8080/users/mkUser", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((resp) => {
      console.log("posted new user!");
    });
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.onModalClose}
      aria-labelledby="form-dialog-title"
      className='add-user-modal'
    >
      <DialogTitle id="form-dialog-title">Add a User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          label="User Name:"
          id="name"
          type="name"
          fullWidth={false}
          value={value}
          onChange={(event) => {setValue(event.target.value)}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={makeUser} color="primary" size="small">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );  
};

export default AddUserModal;
