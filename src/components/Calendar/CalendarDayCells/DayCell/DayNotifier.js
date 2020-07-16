import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    // maxWidth: 220,
    // fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

function DayNotifier(props) {
  const title = props.items.map((item) => (
    <Typography key={props.items.indexOf(item)}>{item}</Typography>
  ));

  return (
    <HtmlTooltip arrow placement="top" title={title}>
      <span className={`icon`}>{props.icon}</span>
    </HtmlTooltip>
  );
}

export default DayNotifier;
