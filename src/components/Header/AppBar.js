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
// import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";

import AddUserModal from "./AddUserModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 2,
    position: "relative",
  },
  appBar: {
    // background: "#1976d2",
    background: "var(--main-color)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar() {
  const [isModalOpen, setModalOpen] = React.useState(false);

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
          {/* <Typography variant="h6" className={classes.title}>
            <IconButton color="inherit">
              <LoyaltyOutlinedIcon /> */}
              <Typography variant="h6" className={classes.title}>
                Tagluz
              </Typography>
            {/* </IconButton>
          </Typography> */}
          <IconButton
            color="inherit"
            style={{ display: DisplayAddMessage, marginRight: "1rem" }}
            onClick={() => setModalOpen(true)}
          >
            <PersonAddIcon />
          </IconButton>
          <AddUserModal
            isModalOpen={isModalOpen}
            onModalClose={() => setModalOpen(false)}
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
