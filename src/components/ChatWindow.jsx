import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };  // This function is used to auto-scroll the chat window to show the latest messages

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
                <span>Flight from {flight.from} to {flight.to} costs {flight.cost} per person with an average duration of {flight.average_duration}. </span>
                <a href={flight.booking_link} target="_blank" rel="noopener noreferrer">Book here</a>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && <Loading />}
    </div>
  )
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ChatWindow;
