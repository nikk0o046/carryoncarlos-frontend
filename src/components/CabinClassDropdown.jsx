import React from 'react';

function CabinClassDropdown() {
    return (
        <select defaultValue="Economy" className='cabin-class-dropdown'>
            <option value="Economy">Economy</option>
            <option value="PremiumEconomy">Premium Economy</option>
            <option value="BusinessClass">Business Class</option>
            <option value="FirstClass">First Class</option>
        </select>
    );
}

export default CabinClassDropdown;
