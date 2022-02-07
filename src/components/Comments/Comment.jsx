import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { TreeItem } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import Votes from "../Votes";
import Snackbar from "../Snackbar";

const useStyles = makeStyles({
  root: {
    marginTop: 15,
    paddingRight: 100
  },
  voteContainer: {},
  commentCOntianer: {},
  user: {
    fontSize: "0.7rem!important",
    fontWeight: "800!important",
    color: "#afafc1"
  },
  comment: {
    fontSize: "0.9rem!important"
  },
  share: {
    fontSize: "0.8rem!important",
    color: "#a5a8b6",
    "&:hover": {
      color: "#272a38"
    }
  }
});

const Comment = ({ comment = {} }) => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(false);

  const { data } = comment;
  const { id, body, author, ups, created_utc, replies, permalink } = data || {};
  const { data: repliesData } = replies || {};
  const { children: repliesChildren = [] } = repliesData || {};

  const createdString = moment(created_utc * 1000).fromNow();

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
  const renderComment = () => {
    return (
      <Grid
        className={classes.root}
        container
        alignItems="center"
        flexWrap="wrap"
      >
        <Votes ups={ups} />
        <Grid
          container
          flexDirection="column"
          item
          xs={11}
          md={11}
          lg={11}
          className={classes.commentContainer}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Typography className={classes.user}>
              {author} - {createdString}
            </Typography>
            <Typography className={classes.comment}>{body}</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ marginTop: "5px" }}>
            <Typography className={classes.share} onClick={e => handleShare(e)}>
              share
            </Typography>
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
  return (
    <>
      {repliesChildren.length > 0 ? (
        <TreeItem nodeId={id} label={renderComment()}>
          {repliesChildren.map((x, idx) => {
            if (idx !== repliesChildren.length - 1) {
              return <Comment key={x.data.id} comment={x} />;
            }
          })}
        </TreeItem>
      ) : (
        <TreeItem nodeId={id} label={renderComment()} />
      )}
    </>
  );
};

export default Comment;
