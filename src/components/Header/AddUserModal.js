import React from "react";
// import { useStoreState/*, useStoreActions*/ } from "easy-peasy";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import "./index.css";

const host = 'tagluz.azurewebsites.net'

const AddUserModal = (props) => {
  const [nameValue, setNameValue] = React.useState("");
  const [appointAdmin, setAppointAdmin] = React.useState(false);

  function makeUser() {
    const body = { name: nameValue, isAdmin: appointAdmin };
    fetch(`https://${host}/users/mkUser`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }).then((resp) => {
      console.log("posted new user!");
    });
  }

  function handleAddUser() {
    makeUser();
    setNameValue("");
  }

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.onModalClose}
      aria-labelledby="form-dialog-title"
      className="add-user-modal"
    >
      <DialogTitle id="form-dialog-title">Add a User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          label="User Name:"
          id="name"
          type="name"
          fullWidth={false}
          value={nameValue}
          onChange={(event) => {
            setNameValue(event.target.value);
          }}
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                icon={<VerifiedUserOutlinedIcon />}
                checkedIcon={<VerifiedUserIcon />}
                name="makeAdmin"
                color="secondary"
                value={appointAdmin}
                onChange={() => setAppointAdmin(!appointAdmin)}
              />
            }
            label="Appoint user admin"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddUser} color="primary" size="small">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
