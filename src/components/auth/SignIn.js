/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import colors from '../../index.scss'
import { signIn } from '../../api/auth'
import { signInSuccess, signInFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

onSignIn = (event) => {
  event.preventDefault()

  const { msgAlert, history, setUser } = this.props

  signIn(this.state)
    .then((res) => setUser(res.data.user))
    .then(() =>
      msgAlert({
        heading: 'Signed In Successfully',
        message: signInSuccess,
        variant: 'success'
      })
    )
    .then(() => history.push('/'))
    .then(() => { localStorage.setItem('user', JSON.stringify(this.state)) })
    .catch((error) => {
      this.setState({ email: '', password: '' })
      msgAlert({
        heading: 'Sign In Failed with error: ' + error.message,
        message: signInFailure,
        variant: 'danger'
      })
    })
}

render () {
  const { email, password } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3 className='text-white' >Sign In </h3>
        <Form onSubmit={this.onSignIn}>
          <Form.Group controlId='email'>
            <Form.Label className='text-white'>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label className='text-white'>Password</Form.Label>
            <Form.Control
              required
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='outline-dark' className='grad' type='submit' style={{
            width: '100%',
            marginTop: '25px'
          }} >Submit</Button>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(SignIn)
