import React from "react";
import "./index.css";

function Footer() {
  // const [versionModalOpen, setVersionModalOpen] = React.useState(false);
  // const [aboutModalOpen, setAboutModalOpen] = React.useState(false);
  // const [contactModalopen, setContactModalOpen] = React.useState(false);

  return (
    <div className="footer">
      <ul className='left-items'>
        {/* <li>App by Pitamer</li> */}
        <li>Tagluz 0.91</li>
      </ul>
      <ul className='right-items'>
        {/* <li>About</li> */}
        {/* <li>Contact</li> */}
        <li>by Pitamar</li>
      </ul>
    </div>
  );
}

export default Footer;
