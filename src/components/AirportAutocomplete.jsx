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

export default function AirportAutocomplete(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [isInputActive, setIsInputActive] = useState(true);


    const handleLocationClick = (location) => {
        setSearchTerm(location.name); // Set the clicked location's name as the searchTerm
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
        const apiKey = 's5Li5-KCv7u4kowJNya1dR011u5gL_Ej'; // Note: Ideally, this should be handled server-side
        const params = new URLSearchParams({
            term: term,
            locale: 'en-US',
            location_types: 'airport',
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
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsInputActive(true)}
            readOnly={!isInputActive} // This will make the input field read-only when not active
            placeholder="Search for an airport..."
          />
          <ul>
            {isInputActive && locations.map((location) => (
              <li key={location.id} onClick={() => handleLocationClick(location)} className="suggestion-item"> 
                {location.name}
              </li>
            ))}
          </ul>
          {error && <p className="error-message">{error}</p>}
        </div>
      );
}
