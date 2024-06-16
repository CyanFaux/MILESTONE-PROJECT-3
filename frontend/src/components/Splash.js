import React from "react";
import Footer from "./Footer";
import Image from "react-bootstrap/Image";

function Splash() {
  return (
    <React.Fragment>
      <h1>Welcome to Movie Mind</h1>
      <Image src="/images/Logo.jpg" alt="Movie Mind Logo Image" className="splashImage" rounded fluid/>
      <Footer />
    </React.Fragment>
  );
}

export default Splash;
