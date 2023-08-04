import React, { useState, useEffect } from 'react'
import './App.css' // Import the CSS file
import ChatWindow from './components/ChatWindow'


function App() {
  // First we initialize 'messages', 'isLoading' and 'errorMsg' states.
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello there, fellow traveler! This is Carry-on Carlos speaking. I've weathered more baggage carousels and customs checkpoints than you've had hot dinners, so you can trust I'll find the right flights for you! To get us started, please tell me the city you're taking off from and give me a description of where you want to land."
    }
  ]);
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  // Console log every times "messages" changes
  //useEffect(() => {
   // console.log(`Updated conversation history: ${JSON.stringify(messages)}`);
  //}, [messages]);

 
  // THIS FUNCTION HANDLES FUNCTION CALLS FROM THE ASSISTANT
  async function handleFunctionCall(functionCall) {
    const { arguments: functionArguments } = functionCall; // taking the value of the arguments property from the functionCall object and assigning it to a new variable functionArguments
    console.log(`functionCall object: ${JSON.stringify(functionCall)}`);
    console.log(`functionArguments: ${functionArguments}`);
    console.log(`Type of functionArguments: ${typeof functionArguments}`);

    const parsedArguments = JSON.parse(functionArguments); // functionArguments is actually a string due to OpenAI's response object
    const requestBody = {
        user_request: parsedArguments.summary_info
    };

    console.log("Request body:", requestBody);
    const response = await fetch(`https://flight-buddy-service-ou44r5rafq-lz.a.run.app/search_flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    } // If the response is not ok (status code is not 2xx), throw an error
  
    const data = await response.json(); // Parse the JSON response body
    return data;
  }

  
  // THIS FUNCTION IS USED TO HANDLE MESSAGES SENT BY THE USER
  const handleSendMessage = async (newMessage) => {
    console.log(`Received new message: ${JSON.stringify(newMessage)}`); // Log the new message
    setLoading(true) // Add the new user message to the 'messages' state immediately
    setErrorMsg(null) // Clear any previous error messages
    const updatedMessages = [...messages, newMessage]; // Create the updated messages array directly
    setMessages(updatedMessages); // Update the state with the new messages array
    console.log(`Sending the following conversation history to the server: ${JSON.stringify(updatedMessages)}`);

    try {
      // We send a fetch request to the server with the conversation history.
      const response = await fetch('http://localhost:8081/send_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversationHistory: updatedMessages })
      })

      // If the response is not ok (status code is not 2xx), handle the error
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(`Error ${response.status}: ${errorData.error}`); // Set the error message from the server response
        setLoading(false); 
        return;
      }

      const data = await response.json() // Parse the JSON response body
      const newAssistantMessage = data.message; // Get the message field from the response

      
      if (newAssistantMessage.function_call) {
        console.log(`Starting to handle function call`);
        // If the assistant message includes a function call, send a predefined message to the user
        const predefinedMessage = {
          role: 'assistant',
          content: "I've got all the info I need, wait a minute and I'll provide you the flights!",
        };
        setMessages(oldMessages => [...oldMessages, predefinedMessage])
          
        // Then handle the function call
        const functionResponse = await handleFunctionCall(newAssistantMessage.function_call);
        console.log(`received function response: ${JSON.stringify(functionResponse)}`);
        
        // We first check if the functionResponse array has any elements. If it's empty, it means no flights were found.
        if (functionResponse.length > 0) {
          // If we found flights, we transform each flight object into a readable string. We use map() to do this transformation for each flight in the functionResponse array.
          const flights = functionResponse.map(flight => {
            return `Flight number ${flight.flight_number} from ${flight.from} to ${flight.to} costs ${flight.price.value} ${flight.price.currency} with an average duration of ${flight.average_duration.hours} hours and ${flight.average_duration.minutes} minutes. You can book it [here](${flight.booking_link}).`
          });
          // We then combine all the flight strings into a single message that also includes an introduction. We use join() to concatenate all the flight strings, with each string on a new line.
          newAssistantMessage.content = "Here are some options I found for you:\n" + flights.join("\n");
        } else {
          newAssistantMessage.content = "I'm sorry, but I couldn't find any flights that match your criteria."; 
        }
      }
  
      setMessages(oldMessages => [...oldMessages, newAssistantMessage]) // Add the new message from the assistant to the 'messages' state
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMsg("Unexpected error. Please try again later."); // Generic error message to the user interface
    } finally {
      setLoading(false); // After the request is completed (either successfully or with an error), set 'isLoading' to false
    }
  }


  return (
    <div className="app">
      <h1>🧳 Carry-on Carlos ✈️</h1>
      <h3>Your personal flight search assistant</h3>
      <ChatWindow sendMessageFunction={handleSendMessage} messages={messages} />
      {errorMsg && <div className="error">{errorMsg}</div>} 
      {isLoading && <p className="loading">Carry-on Carlos is responding...</p>}
    </div>
  );

}

export default App
