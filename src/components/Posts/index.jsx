import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { checkURL } from "../../helpers";

import Votes from "../Votes";
import Snackbar from "../Snackbar";

const useStyles = makeStyles({
  root: {
    margin: "20px 0",
    cursor: "pointer",
    padding: 10
  },
  title: {
    fontWeight: "700!important",
    fontSize: "0.9rem!important",
    color: "#3f4045"
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 5
  },
  upVotes: {
    color: "#a5a8b6"
  },
  arrows: {
    color: "#afafc1"
  },
  links: {
    color: "#a5a8b6",
    fontSize: "0.7rem!important",
    borderRadius: 5,
    padding: 2,
    cursor: "pointer",
    marginRight: "7px!important",
    "&:hover": {
      color: "#272a38"
    }
  },
  linksContainer: {
    textAlign: "center"
  },
  author: {
    color: "#afafc1"
  }
});

const Posts = ({ post, handleOpenArticle }) => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(false);

  const { data = {} } = post;
  const { id, title, ups, thumbnail, author, num_comments, permalink } =
    data || {};

  const handleShare = e => {
    e.stopPropagation();
    const url = `https://www.reddit.com${permalink}`;
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url);
      setSnackbar(true);
      return;
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };
  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      onClick={() => handleOpenArticle(data)}
    >
      <Votes ups={ups} />
      {checkURL(thumbnail) && (
        <Grid item xs={1} md={1} lg={1}>
          <img className={classes.image} src={thumbnail} alt={author} />
        </Grid>
      )}

      <Grid item xs={10} md={10} lg={10} className={classes.image}>
        <Grid item xs={12}>
          <Typography className={classes.title}> {title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.author}>by {author}</Typography>
        </Grid>
        <Grid item container xs={12} style={{ marginTop: 20 }}>
          <Typography className={classes.links}>
            {num_comments} comments
          </Typography>

          <Typography className={classes.links} onClick={e => handleShare(e)}>
            share
          </Typography>
          {/* <Typography className={classes.links}>report</Typography> */}
        </Grid>
      </Grid>
      {snackbar && (
        <Snackbar
          open={snackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="Copied link!"
        />
      )}
    </Grid>
  );
};

export default Posts;
