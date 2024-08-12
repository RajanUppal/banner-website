import React from 'react';
import './App.css';
import Banner from './components/Banner'; // Import the Banner component
import Dashboard from './components/Dashboard'; // Import the Dashboard component

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to the Banner Website</h1>
            </header>
            
            <Dashboard /> {/* Display the dashboard */}
        </div>
    );
}

export default App;
