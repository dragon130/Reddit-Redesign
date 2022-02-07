import React from "react";
import { Snackbar as MuiSnackbar, IconButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const Snackbar = ({ open, autoHideDuration = 6000, onClose, message = "" }) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      message={message}
      action={action}
    />
  );
};

export default Snackbar;
