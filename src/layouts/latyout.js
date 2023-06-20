import React from "react";
import Navbar from "../components/navbar";

const Layout = (props) => {
    return (
        <>
            <Navbar/>
            {props.children}
        </>
    )
}

export default Layout