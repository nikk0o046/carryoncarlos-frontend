// App.js
import React, { useState, useEffect } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'
import { sendFlightRequest, handleFunctionCall, sendFeedbackToServer } from './api/flightBuddyService'
import CarlosImage from './assets/Carry-on_Carlos.png';
import SearchBanner from './components/SearchBanner';
import Feedback from './components/Feedback';
import { v4 as uuidv4 } from 'uuid'; // For user ID

function App() {
  // Define variables and set iniatial states
  const [customerId, setCustomerId] = useState(uuidv4()); // Create user ID
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello there, fellow traveler! This is Carry-on Carlos speaking. I've weathered more baggage carousels and customs checkpoints than you've had hot dinners, so you can trust I'll find the right flights for you! Before we get started, please select your origin city and the number of travelers using the buttons above. Once that's sorted, describe to me where you want to go."
  }]);
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [searchInput, setSearchInput] = useState({});

  useEffect(() => {
   console.log(`Updated conversation history: ${JSON.stringify(messages)}`);
  }, [messages]);

  // Collect feedback
  const [feedbackPrompted, setFeedbackPrompted] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleFeedbackSubmit = async (feedbackData) => {
  
    try {
      const response = await sendFeedbackToServer(feedbackData, customerId);
      console.log("Feedback submitted successfully:", response);
      
      setFeedbackSuccess(true);
      setTimeout(() => {
        setFeedbackSuccess(false); // Reset after 3 seconds so make the notification dissappear
      }, 3000);
  
    } catch (error) {
      console.error("Error while submitting feedback:", error);
    }
  }
  

  // Send message to the backend
  const handleSendMessage = async (newMessage) => {
    console.log(`Received new message from the user: ${JSON.stringify(newMessage)}`);
    setLoading(true)
    setErrorMsg(null)

   // Add structured data if it's the user's first message
    if (messages.length === 1) {
      newMessage.user_inputs = {
          originCity: searchInput.searchTerm,
          travelers: searchInput.travelers
      };
    }

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    console.log(`Sending the following conversation history to the server: ${JSON.stringify(updatedMessages)}`);

    try {
      const data = await sendFlightRequest(updatedMessages, customerId) // Make a request to the backend
      const newAssistantMessage = data.message;

      if (newAssistantMessage.function_call) {
        console.log(`Starting to handle function call`);
        const predefinedMessage = {
          role: 'assistant',
          content: "Alright, buckle up! I'm looking through over 800 airlines for you now. In the meantime, why don't you grab a cup of coffee or do some stretches, because let me tell you, there's nothing worse than cramped legs on a flight! Meet you back here in just a jiffy."
        };
        setMessages(oldMessages => [...oldMessages, predefinedMessage])

        const functionResponse = await handleFunctionCall(newAssistantMessage.function_call, searchInput, customerId);
        console.log(`Received function response: ${JSON.stringify(functionResponse)}`);

        if (functionResponse.length > 0) {
          // if flights were found, map each flight to an object with formatted data
          const flights = functionResponse.map(flight => {
            return {
              flight_number: flight.flight_number,
              from: flight.from,
              to: flight.to,
              cost: `${flight.price.value} ${flight.price.currency}`,
              average_duration: `${flight.average_duration.hours} hours and ${flight.average_duration.minutes} minutes`,
              booking_link: flight.booking_link,
            };
          });

          newAssistantMessage.content = "Alright, mission accomplished! I've wrestled the databases and brought back the best flights just for you. Check them out below. Happy travels!";
          newAssistantMessage.flights = flights;
          setFeedbackPrompted(true);  // Here we ask for feedback after providing flights

        } else {
          newAssistantMessage.content = "I'm sorry, but I couldn't find any flights that match your criteria."; 
        }
      }

      setMessages(oldMessages => [...oldMessages, newAssistantMessage])
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMsg("Unexpected error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1 className="h1-breeserif">🧳 Carry-on Carlos </h1>
      <img src={CarlosImage} alt="Carry-on Carlos" className="carlos-image"/>
      <SearchBanner setSearchData={setSearchInput} />
      <ChatWindow sendMessageFunction={handleSendMessage} messages={messages} isLoading={isLoading} canSendMessage={Boolean(searchInput.searchTerm)}/>
      {errorMsg && <div className="error">{errorMsg}</div>}
      {feedbackPrompted && <Feedback onFeedbackSubmit={handleFeedbackSubmit} />}
      {feedbackSuccess && <div className="success">Thanks for your feedback!</div>}
    </div>
  );
}

export default App
