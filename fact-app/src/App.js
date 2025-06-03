import React, { useState } from 'react';
import './App.css';

// Simple Cat SVG Icon component
const CatIcon = () => (
  <svg className="cat-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-11.5c-.83 0-1.5-.67-1.5-1.5S10.67 5.5 11.5 5.5s1.5.67 1.5 1.5S12.33 8.5 11.5 8.5zm3 0c-.83 0-1.5-.67-1.5-1.5S13.67 5.5 14.5 5.5s1.5.67 1.5 1.5S15.33 8.5 14.5 8.5zm-2.5 3c-1.93 0-3.5 1.57-3.5 3.5 0 .55.13 1.06.36 1.5H8.5c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-.86c.23-.44.36-.95.36-1.5 0-1.93-1.57-3.5-3.5-3.5zm0 1c1.1 0 2 .9 2 2.5 0 .28-.05.55-.12.8H10.12c-.07-.25-.12-.52-.12-.8 0-1.6.9-2.5 2-2.5z" />
  </svg>
);

function App() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [factKey, setFactKey] = useState(0); // Used to re-trigger animation

  const fetchFact = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFact(data.fact);
      setFactKey(prevKey => prevKey + 1); // Change key to re-render and re-animate
    } catch (e) {
      setError(e.message);
      setFact(''); // Clear any old fact
      setFactKey(prevKey => prevKey + 1); // Also for error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1><CatIcon /> Cat Facts</h1>
        <button onClick={fetchFact} disabled={isLoading}>
          Get New Cat Fact
        </button>
        <div className="fact-container">
          {isLoading && <div className="loader"></div>}
          {error && !isLoading && <p key={`error-${factKey}`} className="error">Error: {error}</p>}
          {fact && !isLoading && !error && <p key={`fact-${factKey}`} className="fact">{fact}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
