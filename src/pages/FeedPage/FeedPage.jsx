import React, { useState, useEffect } from "react";
import axios from 'axios';

import './FeedPage.css';
import { Grid } from "semantic-ui-react";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import Gallery from "../../components/Gallery/Gallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
// import PostPage from "../PostPage/PostPage";


import * as postsAPI from "../../utils/postApi";
// import { render } from "@testing-library/react";


export default function FeedPage({user, handleLogout}) {
  const [posts, setPosts] = useState([]); 
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  async function handleAddPost(post) {
    try {
      setLoading(true);
      const data = await postsAPI.create(post); 
      console.log(data, " this is response from the server, in handleAddPost");
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function getRequest() {
    const response = await axios.get('http://catstagram.lofty.codes/api/posts/')
    const posts = response.data
    console.log(posts)
    setPosts([...posts]);
    console.log(posts, 'POSTSSSS')
    const comments = posts[0].comments
    setComments([...comments])
    console.log(comments, 'THIS IS THE ACTUAL COMMENT')

  }
  useEffect(() => {
    getRequest();
  }, []);


  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPostForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: 200 }}>
        <Grid.Column style={{ maxWidth: 1200 }}>
          <Gallery
            posts={posts}
            numPhotosCol={3}
            setSelectedImg={setSelectedImg}
            comments={comments}
          />
        </Grid.Column>
      </Grid.Row>
      {/* <Grid.Row style={{ marginTop: 200 }}>
        <Grid.Column style={{ maxWidth: 1200 }}>
          <PostPage
            setSelectedImg={setSelectedImg}
          />
        </Grid.Column>
      </Grid.Row> */}
    </Grid>
    
  );
}
