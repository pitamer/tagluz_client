import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { useStoreState } from "easy-peasy";

// import TodayIcon from '@material-ui/icons/Today';
// import TimerIcon from '@material-ui/icons/Timer';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";

import AddUserModal from "./AddUserModal";
import InfoModal from "./InfoModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 2,
    position: "relative",
  },
  appBar: {
    background: "var(--main-color)",
  },
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  titleText: {
    margin: "0em 0em 0em 0.5em",
  },
}));

function ButtonAppBar() {
  const [isUserModalOpen, setUserModalOpen] = React.useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = React.useState(false);

  const loggedUser = useStoreState((state) => state.loggedUser);

  const classes = useStyles();
  const DisplayAddMessage = loggedUser.isAdmin ? "" : "none";

  function onLogout() {
    localStorage.clear();
    document.location.href = "/";
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appBar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => setInfoModalOpen(true)}
          >
            <IconButton color="inherit" className={classes.title}>
              <LoyaltyOutlinedIcon />
              <Typography variant="button" className={classes.titleText}>
                Tagluz
              </Typography>
            </IconButton>
          </Typography>
          <InfoModal
            isModalOpen={isInfoModalOpen}
            onModalClose={() => setInfoModalOpen(false)}
          />
          <IconButton
            color="inherit"
            style={{ display: DisplayAddMessage, marginRight: "1rem" }}
            onClick={() => setUserModalOpen(true)}
          >
            <PersonAddIcon />
          </IconButton>
          <AddUserModal
            isModalOpen={isUserModalOpen}
            onModalClose={() => setUserModalOpen(false)}
          />
          {/* <IconButton color="inherit">
            <TodayIcon />
          </IconButton>
          <IconButton color="inherit">
            <TimerIcon />
          </IconButton> */}
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
