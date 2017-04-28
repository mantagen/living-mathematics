import React, { Component } from 'react'

const resize = el => {
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
const delay = fn => (...args) => window.setTimeout(() => fn.apply(null, args), 0)

export default class Textarea extends Component {
  constructor (props) {
    super(props)
    this.onEvent = this.onEvent.bind(this)
  }

  onEvent (e) {
    const textArea = e.target
    delay(resize)(textArea)
  }

  render () {
    const props = Object.assign({
      onChange: this.onEvent,
      onDrop: this.onEvent,
      onKeyDown: this.onEvent,
      onKeyUp: this.onEvent,
      onPaste: this.onEvent,
      cols: 1,
      rows: 1
    }, this.props.input)
    return (
      <textarea {...props} />
    )
  }
}
