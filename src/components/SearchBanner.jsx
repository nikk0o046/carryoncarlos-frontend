import React from 'react';
import AirportAutocomplete from './AirportAutocomplete';
import CabinClassDropdown from './CabinClassDropdown';
import TravelersDropdown from './TravelersDropdown';

function SearchBanner() {
    return (
        <div className="banner">
            <div className="airport-autocomplete">
                <AirportAutocomplete />
            </div>
            <div className="travelers-dropdown">
                <TravelersDropdown />
            </div>
            <div className="cabin-class-dropdown">
                <CabinClassDropdown />
            </div>
        </div>
    );
}

export default SearchBanner;
