import React from 'react';
import POForm from './components/POForm'; // Import the POForm component
import './styles/app.css'; 

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Purchase Order Generator</h1>
      <POForm />
    </div>
  );
};

export default App;
