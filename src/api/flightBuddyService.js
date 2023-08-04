// flightBuddyService.js
export async function sendFlightRequest(updatedMessages) {
    const response = await fetch('http://localhost:8081/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conversationHistory: updatedMessages })
    })
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }
  
    const data = await response.json(); 
    return data;
  }
  
  export async function handleFunctionCall(functionCall) {
    const { arguments: functionArguments } = functionCall;
    const parsedArguments = JSON.parse(functionArguments);
    const requestBody = {
      user_request: parsedArguments.summary_info
    };
  
    const response = await fetch(`https://flight-buddy-service-ou44r5rafq-lz.a.run.app/search_flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    } 
  
    const data = await response.json(); 
    return data;
  }
  