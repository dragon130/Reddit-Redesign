import React from "react";
import { CircularProgress, Box } from "@mui/material/";
const Progress = ({ color = "secondary", size = 40 }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default Progress;
