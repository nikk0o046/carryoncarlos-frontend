// App.js
import React, { useState, useEffect } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'
import { sendFlightRequest, handleFunctionCall } from './api/flightBuddyService'
import CarlosImage from './Carry-on_Carlos.png';

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello there, fellow traveler! This is Carry-on Carlos speaking. I've weathered more baggage carousels and customs checkpoints than you've had hot dinners, so you can trust I'll find the right flights for you! To get us started, please tell me the city you're taking off from and give me a description of where you want to land."
    }
  ]);
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
   console.log(`Updated conversation history: ${JSON.stringify(messages)}`);
  }, [messages]);

  const handleSendMessage = async (newMessage) => {
    console.log(`Received new message: ${JSON.stringify(newMessage)}`);
    setLoading(true)
    setErrorMsg(null)
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    console.log(`Sending the following conversation history to the server: ${JSON.stringify(updatedMessages)}`);

    try {
      const data = await sendFlightRequest(updatedMessages)
      const newAssistantMessage = data.message;

      if (newAssistantMessage.function_call) {
        console.log(`Starting to handle function call`);
        const predefinedMessage = {
          role: 'assistant',
          content: "Alright, buckle up! I'm looking through over 800 airlines for you now. In the meantime, why don't you grab a cup of coffee or do some stretches, because let me tell you, there's nothing worse than cramped legs on a flight! Meet you back here in just a jiffy."
        };
        setMessages(oldMessages => [...oldMessages, predefinedMessage])

        const functionResponse = await handleFunctionCall(newAssistantMessage.function_call);
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
      <h1>🧳 Carry-on Carlos ✈️</h1>
      <img src={CarlosImage} alt="Carry-on Carlos" className="carlos-image"/>
      <ChatWindow sendMessageFunction={handleSendMessage} messages={messages} isLoading={isLoading}/>
      {errorMsg && <div className="error">{errorMsg}</div>} 
    </div>
  );
}

export default App
