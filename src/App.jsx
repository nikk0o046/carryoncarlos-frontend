import React, { useState } from 'react';
import './App.css';
import CarlosMexicanImage from './assets/mexican_carlos_v6.png';
import SearchBanner from './components/SearchBanner';
import FlightQueryInput from './components/FlightQueryInput';
import Suggestions from './components/Suggestions';
import Feedback from './components/Feedback';
import CookieConsentBanner from './components/CookieConsentBanner';

function App() {
    const [flightQuery, setFlightQuery] = useState('');
    const [searchInput, setSearchInput] = useState({}); // Adding state for SearchBanner output
    const [isLoading, setLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [flightsProvided, setFlightsProvided] = useState(false);
    const [feedbackSuccess, setFeedbackSuccess] = useState(false);

    const handleSuggestionClick = (suggestion) => {
        setFlightQuery(prevQuery => prevQuery + ' ' + suggestion);
    }

    const handleSearch = async () => {
        setLoading(true);
        setHasSubmitted(true);
        // TODO: Handle the actual search and fetch flights
        // Make sure to include searchInput when making a search to the backend
        // Update flightsProvided state after fetching
        setTimeout(() => {
          setLoading(false);
          setFlightsProvided(true);
      }, 5000);
    }

    return (
        <div className="app">
            {/* <h1 className="h1-breeserif">🧳 Carry-on Carlos </h1>
            <img src={CarlosImage} alt="Carry-on Carlos" className="carlos-image"/> */}
            <SearchBanner setSearchData={setSearchInput} />
            <FlightQueryInput textValue={flightQuery} onChange={setFlightQuery} />
            <Suggestions onClick={handleSuggestionClick} />
            {/*<div className="color-rectangle"></div>*/}
            <img src={CarlosMexicanImage} alt="Carry-on Carlos" className="carlos-image"/>
            <button className="search-button" onClick={handleSearch}>Search</button>


            {hasSubmitted && isLoading && <p>Loading...</p>}
            {hasSubmitted && !isLoading && flightsProvided && <p>Show flights here...</p>}
            {hasSubmitted && !isLoading && !flightsProvided && <p>No flights found.</p>}
            {flightsProvided && !feedbackSuccess && <Feedback onFeedbackSubmit={(feedback) => console.log("Received feedback:", feedback)} />}
            {feedbackSuccess && <div className="success">Thanks for your feedback!</div>}
            <CookieConsentBanner />
        </div>
    );
}

export default App;
