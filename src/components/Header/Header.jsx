import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";
import AddPostForm from "../AddPostForm/AddPostForm";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <AddPostForm />
        <Link to="" onClick={handleLogout}>
            Logout
            <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
      <Header as="h2" floated="left">
      <Link to="/">
          <Icon>Catstagram</Icon>
        </Link>
      </Header>
    </Segment>
  );
}