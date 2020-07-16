import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./index.css";

function LoginPage(props) {
  const [usernameValue, setuserNameValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const setIsUserKnown = props.setIsUserKnown;

  function authorizeUser(userNameValue, passwordValue) {
    fetch(
      `http://localhost:8080/users/checkUser/${usernameValue}/${passwordValue}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (typeof data.name === "string") {
          localStorage.setItem("username", data.name)
          setIsUserKnown(true)
        }
      });
  }

  return (
    <div className="login-page">
      <div className="column">
        <div className="row">
          <h3>Welcome :)</h3>
        </div>
        <div className="row">
          <TextField
            label="Username:"
            id="name"
            type="name"
            autoFocus={false}
            fullWidth={false}
            value={usernameValue}
            onChange={(event) => {
              setuserNameValue(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <TextField
            label="Password:"
            id="password"
            type="password"
            autoFocus={false}
            fullWidth={false}
            value={passwordValue}
            onChange={(event) => {
              setPasswordValue(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <Button
            onClick={() => authorizeUser(usernameValue, passwordValue)}
            color="primary"
            fullWidth
            variant="outlined"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;