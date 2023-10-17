import React, { useState, useEffect } from 'react';

const debounce = (func, delay) => {
    let inDebounce;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
};

export default function AirportAutocomplete({ searchTerm, setSearchTerm, setSelectedCityID }) {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [isInputActive, setIsInputActive] = useState(true);

    const handleLocationClick = (location) => {
        setSearchTerm(`${location.name}, ${location.country.code}`); // Set the clicked location's name as the searchTerm
        setSelectedCityID(location.id)
        setLocations([]); // Clear the suggestions list after a click
        setIsInputActive(false); // Deactivate the input field
    };

    useEffect(() => {
        if (searchTerm) {
            fetchResultsFromKiwi(searchTerm);
        } else {
            setLocations([]); // Clear results when search term is empty
        }
    }, [searchTerm]);

    const fetchResultsFromKiwi = debounce((term) => {
        const apiURL = 'https://api.tequila.kiwi.com/locations/query';
        const apiKey = import.meta.env.VITE_KIWI_API_KEY; // Note: Ideally, this should be handled server-side. For this project, I have not done it for latency and cost reasons.
        const params = new URLSearchParams({
            term: term,
            locale: 'en-US',
            location_types: 'city',
            limit: 5
        });

        fetch(`${apiURL}?${params.toString()}`, {
            headers: {
                'apikey': apiKey
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setLocations(data.locations);
            setError(null);
        })
        .catch(error => {
            console.error('Error fetching data from kiwi.com:', error);
            setError('Error fetching data. Please try again.');
        });
    }, 300); // Debounce for 300ms

    return (
        <div>
          <input
            className="airport-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsInputActive(true)}
            readOnly={!isInputActive} // This will make the input field read-only when not active
            placeholder="Search for a departure city..."
          />
          <ul>
            {isInputActive && locations.map((location) => (
              <li key={location.id} onClick={() => handleLocationClick(location)} className="suggestion-item"> 
                {`${location.name}, ${location.country.code}`}
              </li>
            ))}
          </ul>
          {error && <p className="error-message">{error}</p>}
        </div>
    );
}

