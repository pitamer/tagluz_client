import React from 'react';
import './index.css'

function Header() {
  return (
    <div className="header">
        <a href="#default" className="logo">TagLuz</a>
        <div className="header-right">
            <a className="active" href="#schedule">Schedule</a>
            <a href="#report">Report</a>
        </div>
    </div> 
  );
}

export default Header;
