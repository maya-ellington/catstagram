import React, { useState, useEffect } from "react";
import { Card, Image, Modal, Header, Button } from "semantic-ui-react";
import AddCommentForm from "../AddCommentForm/AddCommentForm";
import Comment from "../Comment/Comment";


export default function PostCard({ post }){
  
  const [open, setOpen] = React.useState(false)
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  
  async function getComments(){
    try {
      const comments = post.comments
      setComments([...comments])
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    getComments();
  }, []);
  

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
      <Modal.Content>
        <AddCommentForm entry={post.pk}/>
      </Modal.Content>
      {comments.map((comment) => {
        return(
          <Comment 
            comment={comment} 
            key={post.pk} 
            post={post}
          />
        );
      })}
    </Modal>
    )
  }