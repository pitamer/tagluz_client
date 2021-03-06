import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

function ModalNotifier(props) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  if (props.items.length < 1) {
    return (
      <Button disabled>
        <span className={`icon notifier`}>{props.icon}</span>
      </Button>
    );
  }
  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const title = props.items.map((item) => (
    <Typography key={props.items.indexOf(item)}>{item}</Typography>
  ));

  return (
    <Tooltip
      arrow
      placement="top"
      title={title}
      onClose={handleTooltipClose}
      open={tooltipOpen}
      disableTouchListener
    >
      <Button
        // onClick={handleTooltipOpen}
        onTouchEnd={() => setTooltipOpen(!tooltipOpen)}
        onMouseOver={handleTooltipOpen}
        onMouseLeave={handleTooltipClose}
      >
        <span className={`icon notifier`}>{props.icon}</span>
      </Button>
    </Tooltip>
  );
}

export default ModalNotifier;
