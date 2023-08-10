import React, { useState, useEffect } from 'react';
import AirportAutocomplete from './AirportAutocomplete';
import TravelersDropdown from './TravelersDropdown';

function SearchBanner({ setSearchData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // From AirportAutocomplete
    const [selectedCityID, setSelectedCityID] = useState(null);
    const [travelers, setTravelers] = useState({
        adults: 1,
        children: 0,
        infants: 0
    }); // From TravelersDropdown

    useEffect(() => {
        setSearchData({
            searchTerm,
            selectedCityID,
            travelers
        });
    }, [searchTerm, selectedCityID, travelers, setSearchData]);

    // Format the airport text to limit its length
    const formattedCity = () => {
        if (!selectedCityID) return "From: ";
        return `From: ${selectedCityID.length > 15 ? selectedCityID.substring(0, 15) + "..." : selectedCityID}`;
    };
    
    // Calculate the total number of travelers
    const totalTravelers = () => {
        return travelers.adults + travelers.children + travelers.infants;
    };
 

    return (
        <div className="banner">
           <div>
              <button onClick={() => setModalOpen(true)}>{formattedCity()}</button>
           </div>
           <div>
              <button onClick={() => setModalOpen(true)}>{totalTravelers()} travelers</button>
           </div>
     
           <dialog open={modalOpen}>
              <div className="modal-content">
                 <AirportAutocomplete searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedCityID={setSelectedCityID} />
                 <TravelersDropdown travelers={travelers} setTravelers={setTravelers} />
                 <button onClick={() => setModalOpen(false)}>Close</button>
              </div>
           </dialog>
        </div>
     );     
}

export default SearchBanner;