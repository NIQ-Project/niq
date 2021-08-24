import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createList } from '../../api/list'

class CreateList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: {
        name: '',
        month: 0
      },
      dropdownMonth: 'Month'
    }
  }

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  handleChange = (event) => {
    const copiedList = Object.assign(this.state.list)
    console.log(copiedList)
    if (event.target.name === 'name') {
      // copies list object then alters the value(event target value)
      copiedList[event.target.name] = event.target.value
    } else {
      // set copied month to event.target.name(number) and set dropdownMonth to months array index event.target.name(number)
      copiedList.month = event.target.name
      this.setState({ dropdownMonth: this.months[event.target.name] })
    }
    this.setState({ list: copiedList })
    console.log(this.state.list)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert, history } = this.props

    createList(this.state.list, user)
      .then(res => history.push('/'))
      .then(() => msgAlert({
        heading: 'List created',
        message: 'nice work go check out your list',
        variant: 'success'
      }))
      .catch(err => {
        msgAlert({
          heading: 'list creation failed',
          message: 'something went wrong ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { list, dropdownMonth } = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>List name</Form.Label>
            <Form.Control
              required
              name='name'
              value={list.name}
              placeholder='Bucket List Name'
              onChange={this.handleChange}
            />

            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {dropdownMonth}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleChange} name='0'>January</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='1'>February</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='2'>March</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='3'>April</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='4'>May</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='5'>June</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='6'>July</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='7'>August</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='8'>September</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='9'>October</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='10'>November</Dropdown.Item>
                <Dropdown.Item onClick={this.handleChange} name='11'>December</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateList)
