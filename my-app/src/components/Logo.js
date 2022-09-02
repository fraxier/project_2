import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Logo({ variant, xs, md, flex}) {
  
  return (
    <Typography
      variant={variant}
      noWrap
      sx={{
        mr: 2,
        flexGrow: {flex},
        display: { xs: xs, md: md },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
        ㅋUㅋU
      </Link>
      
    </Typography>
  );
}
