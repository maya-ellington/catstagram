import React from "react";
export default function Comment({ comment }){
  
    return(
        <ul>
            <li>{comment.text}</li>
        </ul>    
    )
  }