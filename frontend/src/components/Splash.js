import React from "react";
import Footer from "./Footer";
import Image from 'react-bootstrap/Image';

function Splash() {
    return (
        <React.Fragment>
            <h1>Welcome to Movie Mind</h1>
            <Image src="../../public/images/photo-1560109947-543149eceb16.avif" alt="Movie Mind Logo Image, provided by Anika De Klerk on Unsplash.com" rounded/>
            <Footer />
        </React.Fragment>
    )
}

export default Splash()