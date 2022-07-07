import React from "react";
import { Card, Image, Modal, Header, Button, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";


export default function PostCard({ comments, post }){
  const [open, setOpen] = React.useState(false)

  // const comments = post.comments
  // console.log(comments, 'COMMENTSSS')
  
  
    return(
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Card key={post.pk} raised>
            <Image src={`http://catstagram.lofty.codes/media/${post.image}`} wrapped ui={false} />
            <Card.Content>
              <Card.Description>{post.name}</Card.Description>
            </Card.Content>
          </Card>
          }
        > 
          <Modal.Header>
          <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                  X
                </Button>
              </Modal.Actions>
          </Modal.Header>
          <Modal.Content image>
            <Image size='large' src={`http://catstagram.lofty.codes/media/${post.image}`} wrapped centered/>
          </Modal.Content>
          <Modal.Content>
            <Modal.Description>
              <Header textAlign="center">{post.name}</Header>
            </Modal.Description>
          </Modal.Content>
          {comments.map((comment) => {
            return(
              <Comment 
                comment={comment} 
                key={comment.pk} 
              />
            );
          })}
      </Modal>
        
    )
  }