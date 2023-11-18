import React from 'react';

const suggestions = [
    "Direct flights.",
    "Max 1 layover.",
    "Staying 2-3 nights.",
    "Outbound flight departing after 4pm."
];

const Suggestions = ({ onClick }) => {
    return (
        <div className="suggestions">
            {suggestions.map(suggestion => (
                <button key={suggestion} onClick={() => onClick(suggestion)}>
                    {suggestion}
                </button>
            ))}
        </div>
    );
}

export default Suggestions;
