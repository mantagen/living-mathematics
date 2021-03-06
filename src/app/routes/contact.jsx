import React from 'react'
import fetch from 'isomorphic-fetch'

import { SubmissionError } from 'redux-form'

import ContactForm from '../components/contact-form'

import responseHandler from '../api/response-handler'

export default class ContactPage extends React.Component {
  constructor () {
    super()
    this.state = {
      messageSent: false
    }
    this.submit = this.submit.bind(this)
  }
  submit (values) {
    return fetch('/contact', {
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
