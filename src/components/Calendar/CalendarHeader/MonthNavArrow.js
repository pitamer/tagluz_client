import React from "react";

function MonthNavArrow(props) {
  return (
    <div className={`col col-center icon`} onClick={props.action}>
      chevron_{props.direction}
    </div>
  );
}

export default MonthNavArrow;
