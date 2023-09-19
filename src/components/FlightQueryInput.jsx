import React from 'react';

const FlightQueryInput = ({ textValue, onChange }) => {
    return (
        <textarea
            className="base-input"
            value={textValue}
            placeholder="(Write here): I want to go to Paris for a weekend trip in October. Departure preferably on a Friday."
            onChange={e => onChange(e.target.value)}
        />
    );
}

export default FlightQueryInput;
