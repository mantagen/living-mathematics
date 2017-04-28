import React from 'react'
import { Field, reduxForm } from 'redux-form'

import LoadingMoon from '../components/loading-moon'
import Textarea from '../components/textarea'

const ContactForm = props => {
  const { error, handleSubmit, pristine, submitting, messageSent } = props

  return (
    <div>
      {
        messageSent ? (
          <div>Thank you, you're message has been sent.</div>
        )
        : (
          <form className='form form--contact' onSubmit={handleSubmit}>
            <div className='form__group'>
              <label className='form__label' htmlFor='name'>Name</label>
              <Field name='name' type='text' component='input' />
            </div>
            <div className='form__group'>
              <label className='form__label' htmlFor='email'>Email</label>
              <Field name='email' type='email' component='input' />
            </div>
            <div className='form__group'>
              <label className='form__label' htmlFor='message'>Your message</label>
              <Field name='message' component={Textarea} />
            </div>
            <button
              className='form__submit'
              type='submit'
              disabled={pristine || submitting}
            >
              { submitting
                ? <div className='form__sending'><LoadingMoon /></div>
                : <div className='form__font--reset'>Send</div>
              }
            </button>
            { error && <div className='form__error'>Error: {error}</div> }
          </form>
        )
      }
    </div>
  )
}

// Decorate the form component
export default reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm)
