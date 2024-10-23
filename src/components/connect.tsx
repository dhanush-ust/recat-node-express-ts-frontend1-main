import React from 'react';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NavigateButton: React.FC = () => {
  //const history = useHistory();

  const handleClick = async () => {
    try {
      // Example API call
      const response = await axios.get('http://localhost:3001/api/pos');
      console.log(response.data); // Handle the response as needed

      // Navigate to the next page
      //history.push('/next-page');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      Go to Next Page
    </button>
  );
};

export default NavigateButton;
