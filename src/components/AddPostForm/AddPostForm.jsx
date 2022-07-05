import React, { useState } from 'react';

import { Button, Form, Grid, Segment} from 'semantic-ui-react'

export default function AddEventForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    user: '',
    photoUrl: '',
    date: '',
    location: '',
    description: '',
    postType: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
             
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('name', state.name)
    
    props.handlePost(formData); 
  }


  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
            <Form  autoComplete="off" onSubmit={handleSubmit}>
               <Form.Input
                  className="form-control"
                  name="name"
                  value={state.name}
                  placeholder="Image name"
                  onChange={handleChange}
                  required
              />                
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload cat image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                ADD POST
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}