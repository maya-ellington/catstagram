import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [state, setState] = useState({
    email: '',
    password: '', 
    passwordConf: '',
    first_name: '',
    last_name: '',
  })

  const [selectedFile, setSelectedFile] = useState('');


  async function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData();
    formData.append('photo', selectedFile);

    for (let fieldName in state){
      formData.append(fieldName, state[fieldName])
    }

    try {
      await userService.signup(formData)

      props.handleSignUpOrLogin();

      navigate('/')

    } catch(err){
      console.log(err.message);
      setError(err.message)
    }
  }

    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }


    function handleFileInput(e){
      console.log(e.target.files);
      setSelectedFile(e.target.files[0])
    }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 300 }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src="https://i.imgur.com/lrk0Rja.jpeg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="confirm password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="first_name"
              placeholder="first name"
              value={state.first_name}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="last_name"
              placeholder="last name"
              value={state.last_name}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn" color="black">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}