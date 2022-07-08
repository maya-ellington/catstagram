import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form} from 'semantic-ui-react'


export default function AddCommentForm(entry){

  const [state, setState] = useState({
    text: ''
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    const formData = new FormData()
    formData.append('text', state.text)
    formData.append('entry', entry.entry)
    console.log(entry.entry)
    let url = 'http://catstagram.lofty.codes/api/comments/';
    setState({ text: ''})

    axios.post(url, formData, {
      headers: {
       'Content-Type': 'application/json',
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };
    return (
        <Form  autoComplete="off" onSubmit={handleSubmit}>    
            <Form.Input
                className="form-control"
                name="text"
                value={state.text}
                placeholder="Comment"
                onChange={handleChange}
                required
            />      
            <Button
            type="submit"
            className="btn"
            >
            ADD COMMENT
            </Button>
        </Form>
    );
  
};

