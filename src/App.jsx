// App.js
import React, { useState, useEffect } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'
import { sendFlightRequest, handleFunctionCall } from './api/flightBuddyService'

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
          content: "I've got all the info I need, wait a minute and I'll provide you the flights!",
        };
        setMessages(oldMessages => [...oldMessages, predefinedMessage])

        const functionResponse = await handleFunctionCall(newAssistantMessage.function_call);
        console.log(`Received function response: ${JSON.stringify(functionResponse)}`);

        if (functionResponse.length > 0) {
          const flights = functionResponse.map(flight => `Flight number ${flight.flight_number} from ${flight.from} to ${flight.to} costs ${flight.price.value} ${flight.price.currency} with an average duration of ${flight.average_duration.hours} hours and ${flight.average_duration.minutes} minutes. You can book it [here](${flight.booking_link}).`);
          newAssistantMessage.content = "Here are some options I found for you:\n" + flights.join("\n");
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
      <h3>Your personal flight search assistant</h3>
      <ChatWindow sendMessageFunction={handleSendMessage} messages={messages} isLoading={isLoading}/>
      {errorMsg && <div className="error">{errorMsg}</div>} 
      {isLoading && <p className="loading">Carry-on Carlos is responding...</p>}
    </div>
  );
}

export default App
