import React, { useState, useEffect } from 'react';
import AirportAutocomplete from './AirportAutocomplete';
import TravelersDropdown from './TravelersDropdown';
import CabinClassDropdown from './CabinClassDropdown';

function SearchBanner({ setSearchData }) {
    const [searchTerm, setSearchTerm] = useState(''); // From AirportAutocomplete
    const [selectedCityID, setSelectedCityID] = useState(null);
    const [cabinClass, setCabinClass] = useState('Economy'); // From CabinClassDropdown
    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0,
        infants: 0
    }); // From TravelersDropdown

    useEffect(() => {
        setSearchData({
            searchTerm,
            selectedCityID,
            cabinClass,
            travelers
        });
    }, [searchTerm, selectedCityID, cabinClass, travelers, setSearchData]);

    return (
        <div className="banner">
            <div className="airport-autocomplete">
                <AirportAutocomplete searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedCityID={setSelectedCityID} />
            </div>
            <div className="travelers-dropdown">
                <TravelersDropdown travelers={travelers} setTravelers={setTravelers} />
            </div>
            <div className="cabin-class-dropdown">
                <CabinClassDropdown cabinClass={cabinClass} setCabinClass={setCabinClass} />
            </div>
        </div>
    );
}

export default SearchBanner;