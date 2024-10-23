import React, { useState, useEffect } from 'react';
import axios from 'axios';

const POForm: React.FC = () => {
  const [poNumber, setPONumber] = useState('');
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [showItems, setShowItems] = useState(false); // State to control visibility of items

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/pos', {
        poNumber,
        description,
        totalAmount,
      }, { responseType: 'blob' });
      
      const fileURL = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'purchase_order.pdf');
      document.body.appendChild(link);
      link.click();

      // Reset the form fields after submission
      setPONumber('');
      setDescription('');
      setTotalAmount('');
    } catch (error) {
      console.error('Error creating PO', error);
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/pos');
      setPurchaseOrders(response.data);
      setShowItems(true); // Show items after fetching
    } catch (error) {
      console.error('Error fetching purchase orders', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          PO Number:
          <input type="text" value={poNumber} onChange={(e) => setPONumber(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Total Amount:
          <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
        </label>
        <button type="submit">Generate PO</button>
      </form>

      <button onClick={fetchPurchaseOrders}>Show Items</button>

      {showItems && (
        <div>
          <h2>Existing Purchase Orders</h2>
          <ul>
            {purchaseOrders.map((po, index) => (
              <li key={index}>
                <strong>PO Number:</strong> {po.poNumber} <br />
                <strong>Description:</strong> {po.description} <br />
                <strong>Total Amount:</strong> {po.totalAmount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default POForm;
