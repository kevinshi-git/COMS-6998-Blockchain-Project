import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Receipt from './Receipt';
import './UserDashboard.css';

const UserDashboard = () => {
  const { username } = useParams();
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

//   useEffect(() => {
//     // Here you would typically fetch the user's receipts from your backend
//     // For now, we'll use dummy data
//     setReceipts([
//       // Your receipt data here
//     ]);
//   }, [username]);
    useEffect(() => {
    // Dummy data for testing
    setReceipts([
      {
        id: 1,
        buyer_address: "0x1234567890abcdef1234567890abcdef12345678",
        seller_address: "0xabcdef1234567890abcdef1234567890abcdef12",
        seller_contract_address: "0x7890abcdef1234567890abcdef1234567890abcd",
        amount: "0.5",
        purchase_time: Math.floor(Date.now() / 1000),
        transaction_hash: "0xdef1234567890abcdef1234567890abcdef123456",
        block_number: "12345678",
        status: "Success",
        receipt_index: "0"
      },
      {
        id: 2,
        buyer_address: "0x9876543210abcdef1234567890abcdef12345678",
        seller_address: "0xfedcba1234567890abcdef1234567890abcdef12",
        seller_contract_address: "0x5432abcdef1234567890abcdef1234567890abcd",
        amount: "1.2",
        purchase_time: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
        transaction_hash: "0xabc1234567890abcdef1234567890abcdef123456",
        block_number: "12345679",
        status: "Failed",
        receipt_index: "1"
      },
      {
        id: 3,
        buyer_address: "0x5555567890abcdef1234567890abcdef12345678",
        seller_address: "0x6666cf1234567890abcdef1234567890abcdef12",
        seller_contract_address: "0x7777abcdef1234567890abcdef1234567890abcd",
        amount: "0.75",
        purchase_time: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
        transaction_hash: "0xeee1234567890abcdef1234567890abcdef123456",
        block_number: "12345680",
        status: "Success",
        receipt_index: "2"
      },
      {
        id: 4,
        buyer_address: "0x1111567890abcdef1234567890abcdef12345678",
        seller_address: "0x2222cf1234567890abcdef1234567890abcdef12",
        seller_contract_address: "0x3333abcdef1234567890abcdef1234567890abcd",
        amount: "2.5",
        purchase_time: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
        transaction_hash: "0xfff1234567890abcdef1234567890abcdef123456",
        block_number: "12345681",
        status: "Success",
        receipt_index: "3"
      },
      {
        id: 5,
        buyer_address: "0x4444567890abcdef1234567890abcdef12345678",
        seller_address: "0x5555cf1234567890abcdef1234567890abcdef12",
        seller_contract_address: "0x6666abcdef1234567890abcdef1234567890abcd",
        amount: "0.33",
        purchase_time: Math.floor(Date.now() / 1000) - 345600, // 4 days ago
        transaction_hash: "0xddd1234567890abcdef1234567890abcdef123456",
        block_number: "12345682",
        status: "Failed",
        receipt_index: "4"
      }
    ]);
  }, [username]);

  return (
    <div className="dashboard-container">
      <div className="user-profile">
        <img 
          src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" 
          alt="User profile" 
          className="user-image" 
        />
        <h2>{username}'s Receipt History</h2>
      </div>

      <div className="receipts-container">
        {selectedReceipt ? (
          <>
            <button 
              className="back-button"
              onClick={() => setSelectedReceipt(null)}
            >
              ← Back to List
            </button>
            <Receipt receipt={selectedReceipt} />
          </>
        ) : (
          <div className="receipts-grid">
            {receipts.map((receipt) => (
              <div 
                key={receipt.id}
                className="receipt-card"
                onClick={() => setSelectedReceipt(receipt)}
              >
                <div className="receipt-card-header">
                  <span className={`status-badge ${receipt.status.toLowerCase()}`}>
                    {receipt.status}
                  </span>
                  <span className="amount">{receipt.amount} ETH</span>
                </div>
                <div className="receipt-card-body">
                  <p>Transaction: {receipt.transaction_hash.slice(0, 10)}...</p>
                  <p>{new Date(receipt.purchase_time * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 