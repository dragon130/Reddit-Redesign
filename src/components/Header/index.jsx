import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Tab, Tabs, Typography } from "@mui/material/";

const useStyles = makeStyles({
  selected: {
    color: "#fd4401!important",
    fontWeight: "800!important"
  },
  indicator: {
    background: "#fd4401!important"
  }
});

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
};

const Header = ({ value, handleChange }) => {
  const classes = useStyles();

  return (
    <Tabs
      classes={{ indicator: classes.indicator }}
      value={value}
      onChange={handleChange}
    >
      <Tab
        classes={{ selected: classes.selected }}
        label="Hot"
        {...a11yProps(0)}
      />
      <Tab
        classes={{ selected: classes.selected }}
        label="Top"
        {...a11yProps(1)}
      />
      <Tab
        classes={{ selected: classes.selected }}
        label="New"
        {...a11yProps(2)}
      />
      <Tab
        classes={{ selected: classes.selected }}
        label="Controversial"
        {...a11yProps(3)}
      />
    </Tabs>
  );
};

export default Header;
