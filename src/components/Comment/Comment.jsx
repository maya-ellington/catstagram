import React from "react";
import { Modal } from "semantic-ui-react";
export default function Comment({ comment }){
  
    return(
        <Modal.Content key={comment.pk}>
            <Modal.Description >
                <li>{comment.text}</li>    
            </Modal.Description> 
        </Modal.Content>
    )
  }