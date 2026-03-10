const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function handleFunctionCall(functionCall, searchInput, customerId) {
  const { arguments: functionArguments } = functionCall;
  const parsedArguments = JSON.parse(functionArguments);
  const requestBody = {
    ...searchInput,
    user_request: parsedArguments.summary_info
  };

  const response = await fetch(`${API_BASE_URL}/search_flights`, {
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

export const sendFeedbackToServer = async (feedbackData, customerId) => {
  console.log("Submitting feedback:", feedbackData);

  const response = await fetch(`${API_BASE_URL}/submit_feedback`, {
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
};
