// flightBuddyService.js
export async function sendFlightRequest(updatedMessages, customerId) {
  const response = await fetch('https://chat-backend-image-ou44r5rafq-lz.a.run.app/send_message', {
  //const response = await fetch('http://localhost:8081/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Customer-ID': customerId
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
  
  export async function handleFunctionCall(functionCall, searchInput, customerId) {
    const { arguments: functionArguments } = functionCall;
    const parsedArguments = JSON.parse(functionArguments);
    const requestBody = {
      ...searchInput, // Merge searchInput into the requestBody
      user_request: parsedArguments.summary_info
    };
  
    const response = await fetch("https://flight-buddy-service-ou44r5rafq-lz.a.run.app/search_flights", {
    //const response = await fetch("http://localhost:8080/search_flights", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Customer-ID': customerId
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    } 
  
    const data = await response.json(); 
    return data;
  }

// Send feedback
export const sendFeedbackToServer = async (feedbackData, customerId) => {
  console.log("Submitting feedback:", feedbackData);

  const response = await fetch("https://chat-backend-image-ou44r5rafq-lz.a.run.app/submit_feedback", {
  //const response = await fetch("http://localhost:8081/submit_feedback", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Customer-ID': customerId
    },
    body: JSON.stringify(feedbackData)
  });

  if (!response.ok) {
    throw new Error(`Error submitting feedback: ${response.statusText}`);
  }

  return await response.json();
}
