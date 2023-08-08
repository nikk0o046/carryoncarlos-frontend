import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading';

// ChatWindow component receives sendMessageFunction (which sends user's messages to the server) 
// and messages (the conversation history) as props from its parent (App)
const ChatWindow = ({ sendMessageFunction, messages, isLoading }) => {
  const [message, setMessage] = useState('') // The message state variable is used to keep track of the current message being typed by the user
  const messagesEndRef = useRef(null) // useRef is used to create a reference to the div that will be used to auto-scroll the chat window

  const handleInputChange = (event) => { 
    setMessage(event.target.value) // This function updates the 'message' state whenever the user types into the input field
  }

// This function is triggered when the user clicks on the send button
  const handleSendClick = () => {
    if (message.trim() !== '') {  // Prevent sending empty messages.
        console.log(`Clicked "send" with message: ${message}`); // Log the user's message
        sendMessageFunction({ role: 'user', content: message }) // We send a message object instead of just the text
        setMessage('') // Clear text input field when message is sent
      }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }  // This function is used to auto-scroll the chat window to show the latest messages


  // useEffect hook runs after every render. In this case, it's used to call scrollToBottom function 
  // every time a new message is added to the 'messages' arra
  useEffect(scrollToBottom, [messages])

  return (
    <div className="chat-window">
      <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.role}`}>
          <span>{message.content}</span>
          {message.role === 'assistant' && message.flights && message.flights.map((flight, idx) => (
            <div key={idx}>
              <br/>
              <span>Flight number {flight.flight_number} from {flight.from} to {flight.to} costs {flight.cost} with an average duration of {flight.average_duration}. </span>
              <a href={flight.booking_link} target="_blank" rel="noopener noreferrer">Book here</a>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
      {isLoading && <Loading />}
      <div className="message-input-area">
        <input type="text" value={message} onChange={handleInputChange} className="chat-input" />
        <i className="fas fa-paper-plane send-button" onClick={handleSendClick} />
      </div>
    </div>
  )
}

// Check that the correct type of props are being passed to ChatWindow
ChatWindow.propTypes = {
  sendMessageFunction: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
}

export default ChatWindow;
