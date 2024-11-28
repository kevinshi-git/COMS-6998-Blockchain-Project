import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Receipt from './Receipt';
import './UserDashboard.css';
import CreateTransaction from './CreateTransaction';

const UserDashboard = () => {
  const { username, address } = useParams();
  const [sellerReceipts, setSellerReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [buyerReceipts, setBuyerReceipts] = useState([]);


  const [currentBalance,setCurrentBalance]=useState(0)
  

  const getReceipts = async () =>{//calls apis to get data about users needed for website
    var seller_body={'seller_address': address}
    try {
      const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/get_seller_receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seller_body),
      });

      const data = await response.json();
      console.log("get_seller_receipts",data);
      if (data.success){
        var seller_receipts=data['all_receipts'];
        for (let i=0;i<seller_receipts.length;i++){
          seller_receipts[i]['id']=i+1;
        }
        console.log("seller_receipts",seller_receipts)
        setSellerReceipts(seller_receipts)
      }
      
     
    } catch (err) {
      console.log("dafasdf",err);
    }

    var buyer_body={'buyer_address': address}
    try {
      const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/get_buyer_receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buyer_body),
      });

      const data2 = await response.json();
      console.log("get_buyer_receipts",data2);
      if (data2.success){
        var buyer_receipts=data2['all_receipts'];
        for (let i=0;i<buyer_receipts.length;i++){
          buyer_receipts[i]['id']=i+1;
        }
        console.log("buyer_receipts",buyer_receipts)
        setBuyerReceipts(buyer_receipts)
      }
      
     
    } catch (err) {
      console.log("dafasdf",err);
    }
    
    }


//   useEffect(() => {
//     // Here you would typically fetch the user's receipts from your backend
//     // For now, we'll use dummy data
//     setReceipts([
//       // Your receipt data here
//     ]);
//   }, [username]);
/* 
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
*/
  const getUserBalance = async () => {
      try {
        const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/get_all_accounts_in_network', {
          method: 'GET',
        });
  
        const data = await response.json();
        console.log("get_user_data response",data);
        data["all_accounts"].forEach(function (item) {
          if (item['account_address']==address){
            setCurrentBalance(item['balance'])
          }
        })
       
      } catch (err) {
        console.log("dafasdf",err);
      }

  }
  useEffect(()=> {
    getUserBalance();
  },[])

  useEffect(()=> {
    getReceipts();
  },[username])

  return (
    <div className="dashboard-container">
      <div className="user-profile">
        <img 
          src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" 
          alt="User profile" 
          className="user-image" 
        />
        <h2>Account Balance: {currentBalance}</h2>
        
      </div>

      <div className="receipts-container">
      <h2 style={{color: 'black'}}>{username}'s Sold Items</h2>
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
            {sellerReceipts.map((receipt) => (
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
                  <p>Item: {receipt.item_name}</p>
                  <p>{receipt.purchase_time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="receipts-container">
      <h2 style={{color: 'black'}}>{username}'s Bought Items</h2>
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
            {buyerReceipts.map((receipt) => (
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
                  <p>Item: {receipt.item_name}</p>
                  <p>{receipt.purchase_time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateTransaction current_user={username} address={address}/>
    </div>
  );
};

export default UserDashboard; 