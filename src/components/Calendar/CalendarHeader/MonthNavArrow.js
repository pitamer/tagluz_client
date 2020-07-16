import React from "react";

function MonthNavArrow(props) {
  return (
    <div className={`col col-${props.place}`}>
      <div className="icon" onClick={props.action}>
        chevron_{props.direction}
      </div>
    </div>
  );
}

export default MonthNavArrow;
