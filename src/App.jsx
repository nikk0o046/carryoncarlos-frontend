import React, { useState } from 'react';
import './App.css';
import CarlosMexicanImage from './assets/mexican_carlos_v6.png';
import SearchBanner from './components/SearchBanner';
import FlightQueryInput from './components/FlightQueryInput';
import Suggestions from './components/Suggestions';
import ChatWindow from './components/ChatWindow';
import CookieConsentBanner from './components/CookieConsentBanner';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [flightQuery, setFlightQuery] = useState('');
    const [messages, setMessages] = useState([]); // Messages initial state
    const [searchInput, setSearchInput] = useState({}); // Adding state for SearchBanner output
    const [isLoading, setLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [flightsProvided, setFlightsProvided] = useState(false);
    const [feedbackSuccess, setFeedbackSuccess] = useState(false);
    const [customerId, setCustomerId] = useState(uuidv4()); // Set customer ID


    const handleSuggestionClick = (suggestion) => {
        setFlightQuery(prevQuery => prevQuery + ' ' + suggestion);
    }

    const handleSearch = async () => {
        setLoading(true);
        setHasSubmitted(true);
    
        // Setting initial message in ChatWindow
        const searchingMessage = {
            role: 'assistant',
            content: 'Looking for flights...'
        };
        setMessages([searchingMessage]);
        console.log("Updated messages state:", messages);
    
        const requestBody = {
            ...searchInput,
            user_request: flightQuery  // User's input from the text area
        };

        console.log("Sending to backend:", requestBody);
    
        try {
            const data = await fetch("https://flight-buddy-service-ou44r5rafq-lz.a.run.app/search_flights", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Customer-ID': customerId
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!data.ok) {
                throw new Error(`Error ${data.status}: ${await data.text()}`);
            }
    
            const flightData = await data.json();
            console.log("Received from backend:", flightData);

            if (flightData.length > 0) {
                // if flights were found, map each flight to an object with formatted data
                const totalTravelers = searchInput.travelers.adults + searchInput.travelers.children + searchInput.travelers.infants;
                const flights = flightData.map(flight => {
                  return {
                    flight_number: flight.flight_number,
                    from: flight.from,
                    to: flight.to,
                    cost: `${Math.round(flight.price.value / totalTravelers)} ${flight.price.currency}`,
                    average_duration: `${flight.average_duration.hours} hours and ${flight.average_duration.minutes} minutes`,
                    booking_link: flight.booking_link,
                  };
                });
    
                const newAssistantMessage = {
                    role: 'assistant',
                    content: "Mission complete! Flights below:",
                    flights: flights
                };
    
                setMessages([newAssistantMessage]);
                console.log("Updated messages state:", messages);

                setFlightsProvided(true);
            } else {
                const noFlightsMessage = {
                    role: 'assistant',
                    content: "Sorry, no flights found."
                };
                setMessages([noFlightsMessage]);
                console.log("Updated messages state:", messages);

                setFlightsProvided(false);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            const errorMessage = {
                role: 'assistant',
                content: 'Oops, something went wrong. Please try again.'
            };
            setMessages([errorMessage]);
            console.log("Updated messages state:", messages);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app">
            <SearchBanner setSearchData={setSearchInput} />
            <FlightQueryInput textValue={flightQuery} onChange={setFlightQuery} />
            <Suggestions onClick={handleSuggestionClick} />
            {/*<button className="search-button-2" onClick={handleSearch}>Search Again</button>*/}
            <img src={CarlosMexicanImage} alt="Illustration of Carry-on Carlos, the mascot" className="carlos-image"/>
            <button className="search-button" onClick={handleSearch}>Search</button>
            {hasSubmitted && <ChatWindow messages={messages} isLoading={isLoading} />}
            <CookieConsentBanner />
        </div>
    );
}

export default App;
