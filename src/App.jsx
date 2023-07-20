import React, { useState } from 'react'
import './App.css' // Import the CSS file

function App() {
  const [user_request, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSearchClick = async () => {
    setLoading(true)
    const response = await fetch('https://flight-buddy-service-ou44r5rafq-lz.a.run.app/search_flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_request})
    })

    const data = await response.json()
    setResults(data)
    setLoading(false)
  }

  return (
    <div className="app">
      <h3>✈️ Just type what kind of trip you are looking for and when you'd want to go 🌍</h3>
      <textarea className="search-input" value={user_request} onChange={handleInputChange} />
      <button onClick={handleSearchClick}>Search</button>
      {isLoading && <p>Loading. This typically takes 15-30 seconds.</p>}
      {results.map((result, index) => (
        <div key={index}>
          <h4>Flight Number: {result.flight_number}</h4>
          <p>From: {result.from}</p>
          <p>To: {result.to}</p>
          <p>Price: {result.price.value} {result.price.currency}</p>
          <p>Average Duration: {result.average_duration.hours}h {result.average_duration.minutes}m</p>
          <a href={result.booking_link} target="_blank" rel="noopener">Book this flight</a>
        </div>
      ))}
    </div>
  )
}

export default App
