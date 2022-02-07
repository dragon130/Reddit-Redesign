import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Box
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { checkURL } from "../../helpers";

import Comments from "../Comments";
import Progress from "../Progress";
import Votes from "../Votes";
import Snackbar from "../Snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    height: "100vh",
    margin: "0!important",
    borderRadius: "0!important",
    position: "absolute!important",
    right: 0
  },
  content: {
    padding: "10px!important"
  },
  description: {
    fontSize: 12
  },
  appbar: {
    background: "transparent!important",
    boxShadow: "none!important"
  },
  toolbar: {
    color: "#f93d13"
  },
  author: {
    fontSize: "0.7rem!important",
    color: "#afafc1"
  },
  commentSection: {
    marginTop: 30,
    borderTop: "1px solid #afafc1"
  },
  links: {
    marginRight: 5,
    cursor: "pointer",
    color: "#a5a8b6",
    fontWeight: "700!important",
    fontSize: "0.7rem!important",
    flexBasis: "6%",
    "&:hover": {
      color: "#272a38"
    }
  },
  image: {
    maxHeight: 700,
    margin: "0 auto",
    maxWidth: "100%"
  }
});

const Article = ({ article, open, onClose, scroll = "body" }) => {
  const classes = useStyles();
  const {
    id,
    title,
    ups,
    num_comments,
    url,
    selftext_html,
    selftext,
    author,
    permalink
  } = article || {};

  // console.log("article >", article);
  const [snackbar, setSnackbar] = useState(false);
  const [comments, setComments] = useState([]);
  // console.log("comments >", comments);

  const handleFetchArticle = async data => {
    try {
      const { subreddit, id } = data;

      const res = await axios.get(
        `https://www.reddit.com/r/${subreddit}/comments/${id}.json`
      );
      if (res && res.data) {
        const tempComments = [...res.data[1].data.children];
        tempComments.pop();
        const comments = tempComments;
        setComments(comments);
      }
    } catch (err) {
      console.error("error >", err);
    }
  };

  useEffect(() => {
    if (Object.keys(article).length > 0) {
      handleFetchArticle(article);
    }
  }, [article]);

  const handleShare = () => {
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
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      scroll={scroll}
      fullWidth
      maxWidth="lg"
    >
      <AppBar className={classes.appbar} sx={{ position: "relative" }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography>Comments</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.content}>
        <Grid container alignItems="center">
          <Votes ups={ups} />
          <Grid item xs={11} md={11} lg={11}>
            <Typography className={classes.author}>
              {num_comments} comments - {`Posted by u/${author}`}
            </Typography>
            <Typography>{title}</Typography>
            {selftext && (
              <Typography className={classes.description}>
                {selftext}
              </Typography>
            )}
            {checkURL(url) && (
              <Box sx={{ margin: "20px 0", display: "flex" }}>
                <img className={classes.image} src={url} alt={author} />
              </Box>
            )}

            <Grid container item xs={12} style={{ marginTop: 5 }}>
              <Typography className={classes.links} onClick={handleShare}>
                share
              </Typography>
              {/* <Typography className={classes.links}>report</Typography> */}
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.commentSection}>
          {comments.length === 0 && <Progress />}
          {comments.length > 0 && <Comments comments={comments} />}
        </div>
      </DialogContent>
      {snackbar && (
        <Snackbar
          open={snackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="Copied link!"
        />
      )}
    </Dialog>
  );
};

export default Article;
