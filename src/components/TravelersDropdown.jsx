import React, { useState } from 'react';

function TravelersDropdown({ travelers, setTravelers }) {
    const { adults, children, infants } = travelers;
    const [isTravelersPanelOpen, setTravelersPanelOpen] = useState(false);
    
    const toggleTravelersPanel = () => {
        setTravelersPanelOpen(!isTravelersPanelOpen);
    };

    return (
        <div className="travelers-dropdown">
            <button onClick={toggleTravelersPanel}>
                {adults + children + infants} travelers
            </button>
            {isTravelersPanelOpen && (
                <div className="travelers-panel">
                    <div className="traveler-control">
                        <label>Adults</label>
                        <button onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults - 1 }))} disabled={adults <= 1}>-</button>
                        <span className="traveler-count">{adults}</span>
                        <button onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults + 1 }))} disabled={(adults + children + infants) >= 9}>+</button>
                    </div>
                    <div className="traveler-control">
                        <label>Children</label>
                        <button onClick={() => setTravelers(prev => ({ ...prev, children: prev.children - 1 }))} disabled={children <= 0}>-</button>
                        <span className="traveler-count">{children}</span>
                        <button onClick={() => setTravelers(prev => ({ ...prev, children: prev.children + 1 }))} disabled={(adults + children + infants) >= 9}>+</button>
                    </div>
                    <div className="traveler-control">
                        <label>Infants</label>
                        <button onClick={() => setTravelers(prev => ({ ...prev, infants: prev.infants - 1 }))} disabled={infants <= 0}>-</button>
                        <span className="traveler-count">{infants}</span>
                        <button onClick={() => setTravelers(prev => ({ ...prev, infants: prev.infants + 1 }))} disabled={(adults + children + infants) >= 9}>+</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TravelersDropdown;