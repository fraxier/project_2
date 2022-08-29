import React from "react";
import { Typography } from "@mui/material";
import img from "../imgs/logo-white-32x32.png";

export default function Logo({variant, xs, md, flex=0}) {
  
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
      <img
        src={img}
        alt="fufu logo"
        style={{ height: "32px", marginRight: "7px" }}
      />
      FUFU
    </Typography>
  );
}
