import React from 'react'
import fetch from 'isomorphic-fetch'

import ContactForm from '../containers/contact-form.jsx'

export default class ContactPage extends React.Component {
  submit (values) {
    fetch('http://localhost:1212/contact', {
      method: 'post',
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(console.log)
  }
  render () {
    return (
      <ContactForm onSubmit={this.submit} />
    )
  }
}
