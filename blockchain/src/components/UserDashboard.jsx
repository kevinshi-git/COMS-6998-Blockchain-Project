import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Receipt from './Receipt';
import './UserDashboard.css';
import CreateTransaction from './CreateTransaction';
import ActionButton from './ActionButton'

const UserDashboard = () => {
  const { username, address } = useParams();
  const [sellerReceipts, setSellerReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [buyerReceipts, setBuyerReceipts] = useState([]);
  const [currentBalance,setCurrentBalance]=useState(0)
  

  const getData = async () =>{//calls apis to get data about users needed for website

    try {
      const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/get_user_data', {
        method: 'GET',
      });

      const user_data = await response.json();
      console.log("get_user_data",user_data);
      var account_to_user={}//converts user_data into dict with key=account_address and value=username
      for (let i=0;i<user_data.length;i++){
        account_to_user[user_data[i].account_address]=user_data[i].user_id
      }
      console.log("account_to_user map: ",account_to_user)
      
    } catch (err) {
      console.log("get_user_data error: ",err);
    }

    try {
      const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/get_sellers_w_contracts', {
        method: 'GET',
      });

      const seller_data = await response.json();
      console.log("get_sellers_w_contracts ",seller_data);
      var address_to_window={} //converts user_data into dic with key=account_address and value=return window
      for (var key in seller_data) {
        address_to_window[key]=seller_data[key]['return_window_days']
      }
      console.log("address_to_window: ",address_to_window)
      
    } catch (err) {
      console.log("get_sellers_w_contracts error: ",err);
    }



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
        for (let i=0;i<seller_receipts.length;i++){ //reformat receipt info
          //add id, buyer username and seller username to receipt data
          seller_receipts[i]['id']=i+1;
          seller_receipts[i].seller_username=account_to_user[seller_receipts[i].seller_address]
          seller_receipts[i].buyer_username=account_to_user[seller_receipts[i].buyer_address]

          //convert purchase_time string into date
          var purchase_date= new Date(seller_receipts[i].purchase_time)
          purchase_date.setHours(purchase_date.getHours() - 5) //rewind 5 hours to go from utc to est timezone
          seller_receipts[i].purchase_time=purchase_date

          var return_deadline= new Date(purchase_date) //find last date that refund is valid
          return_deadline.setDate(return_deadline.getDate()+address_to_window[seller_receipts[i].seller_address])
          seller_receipts[i].return_deadline=return_deadline
        }
        console.log("seller_receipts",seller_receipts)
        setSellerReceipts(seller_receipts)
      }
    } catch (err) {
      console.log("seller_address error: ",err);
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
        for (let i=0;i<buyer_receipts.length;i++){//reformat receipt info
          //add id, buyer username and seller username to receipt data
          buyer_receipts[i]['id']=i+1;
          buyer_receipts[i].seller_username=account_to_user[buyer_receipts[i].seller_address]
          buyer_receipts[i].buyer_username=account_to_user[buyer_receipts[i].buyer_address]

          //convert purchase_time string into date
          var purchase_date= new Date(buyer_receipts[i].purchase_time)
          purchase_date.setHours(purchase_date.getHours() - 5) //rewind 5 hours to go from utc to est timezone
          buyer_receipts[i].purchase_time=purchase_date

          var return_deadline= new Date(purchase_date) //find last date that refund is valid
          return_deadline.setDate(return_deadline.getDate()+address_to_window[buyer_receipts[i].seller_address])
          buyer_receipts[i].return_deadline=return_deadline
        }
        console.log("buyer_receipts",buyer_receipts)
        setBuyerReceipts(buyer_receipts)
      }
      
     
    } catch (err) {
      console.log("buyer_address error: ",err);
    }
    
    }
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
    getData();
  },[username])

  const handleTransactionComplete = () => {
    getData();
    getUserBalance();
  };

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
        <h2 style={{color: 'black'}}>{username}'s Sold Items: {sellerReceipts.length}</h2>
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
                <span className="amount">+{receipt.amount} ETH</span>
              </div>
              <div className="receipt-card-body">
                <p>Buyer: {receipt.buyer_username}</p>
                <p>Seller: {receipt.seller_username}</p>
                <p>Transaction: {receipt.transaction_hash.slice(0, 10)}...</p>
                <p>Item: {receipt.item_name}</p>
                <p>Purchase Time: {receipt.purchase_time.toLocaleString()}</p>
                <p>Return Deadline: {receipt.return_deadline.toLocaleString()}</p>
              </div>
              <ActionButton 
                receipt_status={receipt.status}  
                transaction_hash={receipt.transaction_hash} 
                is_seller={true} 
                return_deadline={receipt.return_deadline} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="receipts-container">
        <h2 style={{color: 'black'}}>{username}'s Bought Items: {buyerReceipts.length}</h2>
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
                <span className="amount">-{receipt.amount} ETH</span>
              </div>
              <div className="receipt-card-body">
                <p>Buyer: {receipt.buyer_username}</p>
                <p>Seller: {receipt.seller_username}</p>
                <p>Transaction: {receipt.transaction_hash.slice(0, 10)}...</p>
                <p>Item: {receipt.item_name}</p>
                <p>Purchase Time: {receipt.purchase_time.toLocaleString()}</p>
                <p>Return Deadline: {receipt.return_deadline.toLocaleString()}</p>
              </div>
              <ActionButton 
                receipt_status={receipt.status} 
                transaction_hash={receipt.transaction_hash} 
                is_seller={false} 
                return_deadline={receipt.return_deadline} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      {selectedReceipt && (
        <div className="modal-overlay" onClick={() => setSelectedReceipt(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Transaction Details</h2>
              <button className="modal-close" onClick={() => setSelectedReceipt(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <Receipt receipt={selectedReceipt} />
            </div>
          </div>
        </div>
      )}

      <CreateTransaction 
        current_user={username} 
        address={address}
        onTransactionComplete={handleTransactionComplete}
      />
    </div>
  );
};

export default UserDashboard; 