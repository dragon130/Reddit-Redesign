import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const useStyles = makeStyles({
  upVotes: {
    color: "#a5a8b6"
  },
  arrows: {
    color: "#afafc1"
  }
});

const Votes = ({ ups }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      xs={1}
      md={1}
      lg={1}
    >
      <div>
        <ArrowDropUpIcon className={classes.arrows} />
      </div>
      <Typography className={classes.upVotes}>{ups}</Typography>
      <div>
        <ArrowDropDownIcon className={classes.arrows} />
      </div>
    </Grid>
  );
};

export default Votes;
