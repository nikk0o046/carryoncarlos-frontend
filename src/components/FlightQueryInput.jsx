import React, { useState, useEffect, useRef } from 'react';

const FlightQueryInput = ({ textValue, onChange }) => {
    const questions = [
        "I want to go to somewhere warm in Europe for a weekend trip in October. Departure preferably on a Friday.",
        "One-way trip to LA on 12th of January. Direct flights.",
        "I want to go to Eastern Europe for nightlife. Staying 4-5 nights. Max 1 layover.",
        "I need flights to Rome next Friday. Staying 2 nights. Direct flights."
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentPlaceholder, setCurrentPlaceholder] = useState('');
    const charIndexRef = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const question = questions[currentQuestionIndex];
            if (charIndexRef.current < question.length) {
                setCurrentPlaceholder(question.substring(0, charIndexRef.current + 1));
                charIndexRef.current += 1;
            } else {
                clearInterval(intervalRef.current);
                setTimeout(() => {
                    setCurrentPlaceholder('');
                    charIndexRef.current = 0;
                    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
                }, 1000); // Decrease this to decrease time between sentences
            }
        }, 50); // Decrease this to increase typing speed

        return () => {
            clearInterval(intervalRef.current);
        };

    }, [currentQuestionIndex, questions]);

    return (
        <textarea
            className="base-input"
            value={textValue}
            placeholder={currentPlaceholder}
            onChange={e => onChange(e.target.value)}
        />
    );
}

export default FlightQueryInput;

