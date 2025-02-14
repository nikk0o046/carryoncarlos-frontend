# Carry-on Carlos (Frontend)

## Overview

This is a frontend for a web application designed to assist users in finding flights. By integrating with a backend service, the app provides flight suggestions based on user queries, displays them in a chat interface, and offers additional query suggestions to refine search results.

Check live demo [here](https://nikk0o046.github.io/carryoncarlos-frontend/).

## Technologies Used

- **React**: Used for building the user interface.
- **React Hooks**: For state management and side effects.
- **Fetch API**: To make requests to the backend services.
- **UUID**: For generating unique customer IDs.

### Components

- **SearchBanner**: Higher level component at the top of the page that gathers user info. Consist of AirportAutoComplete, CabinClassDropdown and TravelersDropdown.
- **AirportAutoComplete**: This is how you select the city of origin. Start typing, and it makes an API request to Kiwi's location API to show possible alternatives. This guarantees that origin is formatted as expected by the backend.
- **CabinClassDropdown** Allows the user to specify cabin class. However, currently not in use, it just defaults to economy.
- **TravelersDropdown** Allows the user to specify amount and type of travelers. Verifies that certain limits are not exceeded.
- **FlightQueryInput**: Allow users to describe what flights they are looking for. Also, some examples are shown as a placeholder.
- **Suggestions**: Offers suggestion that user can click to include them in their search query making writing it faster. Ideally these would change dynamically based on what has already been written, but that has not been implemented yet. Additionally, they subtly educate users by showing them examples what kind of things are possible to search for (e.g. outbound flights after 4pm).
- **ChatWindow**: Used to display results of the flight search. Was originally designed for back-and-forth communication, but I ditched the idea for UX reasons. Works fine just displaying the flights.
- **Loading** Just displays loading animation
- **CookieConsentBanner** Displays a question about cookies and informs user that queries are stored and sent to OpenAI for analysis. If accepted, Google Analytics is activated.
- **Feedback** Allows the user to send feedback. However, I think this should be modified and thus it's currently not in use.

## Reflection

This is the most complex frontend I've built so far. I've used ChatGPT generated code a lot which has made developing this so much faster, but also came with it's own problems and I've had to troubleshoot a lot. It seems that ChatGPT only does well when the desired input and output are very clearly defined and the component does not depend on many other components. Also, modifying how the app looks using CSS was pain with ChatGPT: for now, I think it should be done without it.

## Backend Repository

For more in-depth information about the backend logic and APIs, check out the [Backend Repository](https://github.com/nikk0o046/carryoncarlos-backend/)

## Contact

Niko Virtanen  
niko.virtanen@alumni.aalto.fi
