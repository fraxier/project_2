import { Paper, Typography } from "@mui/material";
import React from "react";

export default function Practice( { practiceSession, user } ) {

  return (
    <Paper elevation={5} sx={{ p: 5 }}>
      <Typography>
        Hey {user.username}! Time to practice!
      </Typography>
    </Paper>
  )
}