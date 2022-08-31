import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {

    return (
        <>
            <Typography variant="h4">Oops! I couldn't find this page... :(</Typography>
            <Typography variant="h4">If you think this page does exist, try logging in first!</Typography>
            <Link to={'/'}>Home</Link>
        </>
    )
}