import React, { useState } from 'react';

function TravelersDropdown() {
    const [isTravelersPanelOpen, setTravelersPanelOpen] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const totalTravelers = adultCount + childCount + infantCount;

    const toggleTravelersPanel = () => {
        setTravelersPanelOpen(!isTravelersPanelOpen);
    };

    return (
        <div className="travelers-dropdown">
            <button onClick={toggleTravelersPanel}>
                {totalTravelers} travelers
            </button>
            {isTravelersPanelOpen && (
                <div className="travelers-panel">
                    <div className="traveler-control">
                        <label>Adults</label>
                        <button onClick={() => setAdultCount(adultCount - 1)} disabled={adultCount <= 1}>-</button>
                        {adultCount}
                        <button onClick={() => setAdultCount(adultCount + 1)}>+</button>
                    </div>
                    <div className="traveler-control">
                        <label>Children</label>
                        <button onClick={() => setChildCount(childCount - 1)} disabled={childCount <= 0}>-</button>
                        {childCount}
                        <button onClick={() => setChildCount(childCount + 1)}>+</button>
                    </div>
                    <div className="traveler-control">
                        <label>Infants</label>
                        <button onClick={() => setInfantCount(infantCount - 1)} disabled={infantCount <= 0}>-</button>
                        {infantCount}
                        <button onClick={() => setInfantCount(infantCount + 1)}>+</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TravelersDropdown;
