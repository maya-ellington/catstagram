import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";


export default function PostCard({ post }){
      return(
        <Card key={post.pk} raised>
          <Image src={`http://catstagram.lofty.codes/media/${post.image}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.name}</Card.Description>
          </Card.Content>
        </Card>
      )
}

