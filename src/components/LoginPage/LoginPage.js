import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";

import TagforceLogo from "../../tagforce_logo_and_text_black.jpg";

import "./index.css";

const host = "tagluz.azurewebsites.net";

function LoginPage(props) {
  const [usernameValue, setuserNameValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const setIsUserKnown = props.setIsUserKnown;

  function authorizeUser(userNameValue, passwordValue) {
    fetch(`https://${host}/users/checkUser/${usernameValue}/${passwordValue}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("username", usernameValue);
          setIsUserKnown(true);
        }
      });
  }

  return (
    <div className="login-page">
      <div className="column">
        <IconButton color="inherit" className="logos">
          <span className="logo-first-item">
            <img src={TagforceLogo} alt="Tagforce logo" height="30em" />
          </span>
          <span className="logo-divider">|</span>
          <LoyaltyOutlinedIcon />
          <Typography
            variant="overline"
            style={{ margin: "0.8em 0em 0em 0.25em" }}
          >
            Tagluz
          </Typography>
        </IconButton>
        <div className="row">
          <TextField
            label="Username:"
            id="username"
            type="username"
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
