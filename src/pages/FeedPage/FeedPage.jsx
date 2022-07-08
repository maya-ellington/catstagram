import React, { useState, useEffect } from "react";
import axios from 'axios';

import './FeedPage.css';
import { Grid } from "semantic-ui-react";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import Gallery from "../../components/Gallery/Gallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

// import { render } from "@testing-library/react";


export default function FeedPage({user, handleLogout}) {
  const [posts, setPosts] = useState([]); 
  const [error, setError] = useState("");


  async function getRequest() {
    try {
      const response = await axios.get('https://catstagram.lofty.codes/api/posts/')
      const posts = response.data
      setPosts([...posts]);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
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
      <Grid.Column>
          <AddPostForm />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: 20 }}>
        <Grid.Column style={{ maxWidth: 1200 }}>
          <Gallery
            posts={posts}
            numPhotosCol={3}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
