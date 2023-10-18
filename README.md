# Flight Buddy

## Overview

Flight Buddy is a frontend web application designed to assist users in finding flights. By integrating with a backend service, the app provides flight suggestions based on user queries, displays them in a chat interface, and offers additional query suggestions to refine search results.

Check live demo here: [carryoncarlos.com](https://carryoncarlos.com)

![App Screenshot](screenshot_url.png) _(Replace with a screenshot of your app)_

## Features

- **Dynamic Flight Search**: Allows users to input their flight queries using natural language.
- **Interactive Chat Interface**: Engaging chat-based user interface that displays flight search results.
- **Custom Suggestions**: Offers users additional query suggestions to refine their search.

## Technologies Used

- **React**: Used for building the user interface.
- **React Hooks**: For state management and side effects.
- **Fetch API**: To make requests to the backend services.
- **UUID**: For generating unique customer IDs.

### Components

- **SearchBanner & FlightQueryInput**: Allow users to specify their flight criteria.
- **Suggestions**: Offers suggestion that user can click to include them in their search query making writing it faster. Ideally these would change dynamically based on what has already been written, but that has not been implemented yet. Additionally, they subtly educate users by showing them examples what kind of things are possible to search for (e.g. outbound flights after 4pm).
- **ChatWindow**: Used to display results of the flight search. Was originally designed for back-and-forth communication, but I ditched the idea for UX reasons. Works fine just displaying the flights.

Flight Buddy employs a `CookieConsentBanner` for user privacy and legal compliance. Key features include:

- **Persistent Consent**: User choices are remembered across sessions.
- **Conditional Analytics**: Google Analytics only loads upon user consent.
- **Transparency**: A note informs users of anonymous data storage for service improvement via OpenAI.

## Reflection

Developing Flight Buddy was a journey in refining user experience and integrating with real-time services. The challenge was not just to fetch the data, but to present it in a way that's intuitive and engaging for the user.

## Backend Repository

For more in-depth information about the backend logic and APIs, check out the [Backend Repository](#). _(Replace with your backend repo link)_

## Contact

For any further questions or feedback, please reach out:

- Email: nikk0o046@gmail.com
