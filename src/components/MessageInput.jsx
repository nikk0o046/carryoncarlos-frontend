import React, { useState } from 'react'
import PropTypes from 'prop-types'

const MessageInput = ({ sendMessageFunction }) => {
  const [message, setMessage] = useState('') // The message state variable is used to keep track of the current message being typed by the user

  const handleInputChange = (event) => { 
    setMessage(event.target.value) // This function updates the 'message' state whenever the user types into the input field
  }

  const handleSendClick = () => {
    if (message.trim() !== '') {  // Prevent sending empty messages.
        sendMessageFunction({ role: 'user', content: message }) // We send a message object instead of just the text
        setMessage('') // Clear text input field when message is sent
    }
  }

  return (
    <div className="message-input-area">
        <input type="text" value={message} onChange={handleInputChange} className="chat-input" />
        <i className="fas fa-paper-plane send-button" onClick={handleSendClick} />
    </div>
  )
}

MessageInput.propTypes = {
  sendMessageFunction: PropTypes.func.isRequired,
}

export default MessageInput
