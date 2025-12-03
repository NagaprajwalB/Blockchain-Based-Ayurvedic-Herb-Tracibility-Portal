import React, { useState } from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ayurvedic Herb Provenance Tracker</h1>
        <p>Generate QR codes for herb tracking and authenticity verification</p>
      </header>
      <main className="App-main">
        <QRCodeGenerator />
      </main>
    </div>
  );
}

export default App;
