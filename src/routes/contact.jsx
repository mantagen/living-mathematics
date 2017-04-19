import React, { Component } from 'react'

class Contact extends Component {
  constructor(props) {
    super(props)
    this.onTextareaKeyup = this.onTextareaKeyup.bind(this)
  }

  onTextareaKeyup(e) {
    const messageTextarea = e.target
    messageTextarea.style.height = this.getScrollHeight(messageTextarea)
  }

  getScrollHeight(el) {
    return (el.scrollHeight > el.clientHeight) ? el.scrollHeight + 'px' : el.clientHeight;
  }

  render() {
    return (
      <form className='contact-form'>
        <h1>Get in touch.</h1>
        <div className='form-group'>
          <label htmlFor='name'>Your name</label>
          <input className='input' name='name' type='text' placeholder='Your name' />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Your email</label>
          <input className='input' name='email' type='email' placeholder='Your email' />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Your message</label>
          <textarea
            onKeyUp={this.onTextareaKeyup}
            className='input'
            cols='1'
            rows='1'
            name='message'
            placeholder='Your message'>
          </textarea>
        </div>
        <button className='send-button hidden' type='submit' disabled>
          Send
          <i className='material-icons send-icon'>send</i>
        </button>
      </form>
    )
  }
}

export default Contact
