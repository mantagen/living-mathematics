import React from 'react'
import fetch from 'isomorphic-fetch'

import { SubmissionError } from 'redux-form'

import ContactForm from '../components/contact-form.js'

import responseHandler from '../api/response-handler.js'

export default class ContactPage extends React.Component {
  constructor () {
    super()
    this.state = {
      messageSent: false
    }
  }
  submit (values) {
    return fetch('http://localhost:1212/contact0', {
      method: 'post',
      body: JSON.stringify(values)
    })
      .then(responseHandler)
      .then(() => {
        this.setState({
          messageSent: true
        })
      })
      .catch(err => {
        throw new SubmissionError({_error: err.message})
      })
  }
  render () {
    return (
      <ContactForm onSubmit={this.submit} messageSent={this.state.messageSent} />
    )
  }
}
