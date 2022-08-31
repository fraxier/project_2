import React from "react";
import { Typography } from "@mui/material";

export default function Logo({ variant, xs, md, flex}) {
  
  return (
    <Typography
      variant={variant}
      noWrap
      component="a"
      href="/"
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
      ㅋUㅋU
    </Typography>
  );
}
