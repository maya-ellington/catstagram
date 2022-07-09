import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
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
        <Image src="https://i.imgur.com/zDaNXvR.png" />
        <Link to="/" color="white">
          Catstagram
        </Link>
      </Header>
    </Segment>
  );
}