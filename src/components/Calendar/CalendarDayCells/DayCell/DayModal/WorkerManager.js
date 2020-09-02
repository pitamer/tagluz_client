import React from "react";
import { useStoreActions } from "easy-peasy";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function WorkerManager(props) {
  const delShift = useStoreActions((actions) => actions.delShift);

  const workers = props.workers;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    return null;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDelShift(worker) {
    const shiftPayload = {
      day: props.dayForDB,
      user: worker,
    };
    delShift(shiftPayload);
    if (props.workers.length > 0) {
      handleClose();
    }
  }

  return (
    <>
      <div style={{ display: props.display }}>
        <Button
          onClick={handleClick}
          fullWidth
          size="small"
          variant="contained"
          disableElevation
          style={{
            borderRadius: "0px",
            backgroundColor: "#333",
            color: "#fff",
            marginTop: "-0.8em",
          }}
        >
          <span className={`icon`}>build</span>Manage Workers
        </Button>
        <Menu
          id="shift-manager-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {workers.map((worker, index) => (
            <MenuItem
              key={workers.indexOf(worker)}
              onClick={(event) => handleMenuItemClick(event, index)}
              style={{
                marginTop: "-0.5em",
                marginBottom: "-0.5em",
              }}
            >
              <>
                <Button
                  onClick={() => handleDelShift(worker)}
                  style={{ color: "crimson" }}
                >
                  X
                </Button>
                {worker}
              </>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  );
}

export default WorkerManager;
