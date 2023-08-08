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
                        {adults}
                        <button onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults + 1 }))}>+</button>
                    </div>
                    <div className="traveler-control">
                        <label>Children</label>
                        <button onClick={() => setTravelers(prev => ({ ...prev, children: prev.children - 1 }))} disabled={children <= 0}>-</button>
                        {children}
                        <button onClick={() => setTravelers(prev => ({ ...prev, children: prev.children + 1 }))}>+</button>
                    </div>
                    <div className="traveler-control">
                        <label>Infants</label>
                        <button onClick={() => setTravelers(prev => ({ ...prev, infants: prev.infants - 1 }))} disabled={infants <= 0}>-</button>
                        {infants}
                        <button onClick={() => setTravelers(prev => ({ ...prev, infants: prev.infants + 1 }))}>+</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TravelersDropdown;