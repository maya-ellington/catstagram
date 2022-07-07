import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Segment} from 'semantic-ui-react'


export default function AddPostForm(props){
  const [selectedFile, setSelectedFile] = useState('')

  const [state, setState] = useState({
    name: '',
    image: null
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }


  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  function handleSubmit(e) {

    e.preventDefault();

    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('name', state.name)

    let url = 'http://catstagram.lofty.codes/api/posts/';
    axios.post(url, formData, {
      headers: {
       'Content-Type': 'multipart/form-data',
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
        console.log(state)
  };
    return (
      <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="name"
                  value={state.name}
                  placeholder="Image title"
                  onChange={handleChange}
                  required
              />      
              <Form.Input
                className="form-control"
                type="file"
                name="image"
                placeholder="upload cat image"
                onChange={handleFileInput}
              />   
              <Button
                type="submit"
                className="btn"
              >
                ADD CAT POST
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
      // <div>
      //   <form onSubmit={handleSubmit}>
      //     <p>
      //       <input type="text" placeholder='Title' id='title' value={state.title} onChange={handleChange} required/>
      //     </p>
      //     <p>
      //       <input type="file"
      //              id="image"
      //               onChange={handleImageChange} required/>
      //     </p>
      //     <input type="submit"/>
      //   </form>
      // </div>
    );
  
};

