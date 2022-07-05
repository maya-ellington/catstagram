import React, { useState, useEffect } from "react";

import './FeedPage.css';
import { Grid } from "semantic-ui-react";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import Gallery from "../../components/Gallery/Gallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";

import * as postsAPI from "../../utils/postApi";


export default function FeedPage({user, handleLogout}) {
  console.log(postsAPI, " <-- postsAPI")
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);


  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user}/>
        <Loading />
      </>
    );
  } 

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
          <AddPostForm handleAddSunPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ marginTop: 200 }}>
        <Grid.Column style={{ maxWidth: 1200 }}>
          <Gallery
            sunPosts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            user={user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
