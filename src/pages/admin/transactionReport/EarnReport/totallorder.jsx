import React from 'react';

const TotalOrders = ({ totalAmount }) => {
  return (
    <div className="total--orders">
      <h3>PKR{totalAmount}</h3>
      <span>Payments Amount</span>
    </div>
  );
};

export default TotalOrders;
