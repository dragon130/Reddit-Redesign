import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Posts from "../components/Posts";
import Article from "../components/Article";
import Header from "../components/Header";
import RedditLogo from "../assets/images/reddit-logo.png";

const useStyles = makeStyles({
  root: {
    background: "#f8f8f8"
  },
  img: {
    width: "20%"
  },
  postsContainer: {
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.50)",
    background: "#fff",
    borderRadius: 5,
    "& :hover": {
      background: "#dbdbdb"
    }
  },
  tabContainer: {
    margin: "20px 0!important"
  },
  navContainer: {
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.50)",
    background: "#fff"
  },
  logo: {
    maxHeight: 80,
    maxWidth: "100%"
  }
});

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [openArticle, setOpenArticle] = useState(false);
  const [article, setArticle] = useState({});

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const getPostType = type => {
    switch (type) {
      case 0:
        return "hot";
      case 1:
        return "top";
      case 2:
        return "new";
      case 3:
        return "controversial";
      default:
        return "hot";
    }
  };

  const fetchPosts = async tab => {
    const postType = getPostType(tab);
    try {
      const res = await axios.get(
        `https://www.reddit.com/r/popular/${postType}.json`
      );

      if (res && res.data && res.data.data) {
        const { children } = res.data.data;
        setPosts(children);
      }
    } catch (err) {
      console.error("error >", err);
    }
  };

  useEffect(() => {
    fetchPosts(tab);
  }, [tab]);

  const handleOpenArticle = data => {
    setArticle(data);
    setOpenArticle(true);
  };
  const handleCloseArticle = () => {
    setArticle({});
    setOpenArticle(false);
  };

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid className={classes.navContainer} item xs={2} md={2} lg={2}>
        <Grid item container justifyContent="center" xs={12}>
          <img className={classes.logo} src={RedditLogo} alt="reddit logo" />
        </Grid>
      </Grid>
      <Grid item xs={10} md={10} lg={10}>
        <Grid item xs={12} className={classes.tabContainer}>
          <Header value={tab} handleChange={handleChangeTab} />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          xs={12}
          md={12}
          lg={12}
          className={classes.postsContainer}
        >
          {posts && posts.length > 0 ? (
            <>
              {posts.map(x => {
                return (
                  <Posts
                    key={x.data.id}
                    post={x}
                    handleOpenArticle={handleOpenArticle}
                  />
                );
              })}
            </>
          ) : (
            <>No posts to show</>
          )}
        </Grid>
      </Grid>

      {openArticle && (
        <Article
          article={article}
          open={openArticle}
          onClose={handleCloseArticle}
        />
      )}
    </Grid>
  );
};

export default Home;
