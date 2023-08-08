import React from 'react';

function CabinClassDropdown({ cabinClass, setCabinClass }) {
    return (
        <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className='cabin-class-dropdown'>
            <option value="Economy">Economy</option>
            <option value="PremiumEconomy">Premium Economy</option>
            <option value="BusinessClass">Business Class</option>
            <option value="FirstClass">First Class</option>
        </select>
    );
}

export default CabinClassDropdown;