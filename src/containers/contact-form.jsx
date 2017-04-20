import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import Textarea from '../components/textarea.jsx'

class ContactForm extends Component {
  render () {
    const { handleSubmit } = this.props
    return (
      <form className='form__contact' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>First Name</label>
          <Field name='name' type='text' component='input' />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <Field name='email' type='email' component='input' />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Your message</label>
          <Field name='message' component={Textarea} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

// Decorate the form component
export default reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm)
