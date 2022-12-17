import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import Container from '@mui/material/Container';
import "./Home.scss"


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div> Error !!!</div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <Container fixed className="container">
        {postList.map((post) => (
          <Post userId= {post.userId} userName= {post.userName} title={post.title} text={post.text}></Post>
        ))}
      </Container>
    );
  }
}

export default Home;
