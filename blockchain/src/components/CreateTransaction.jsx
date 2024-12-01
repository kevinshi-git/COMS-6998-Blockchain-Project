import Select from 'react-select';
import { useEffect, useState } from 'react';
import './CreateTransaction.css';

function CreateTransaction({current_user, address, onTransactionComplete}){
    const [price, setPrice] = useState(0);
    const [item, setItem] = useState('');
    const [buyer, setBuyer] = useState({});
    const [message, setMessage] = useState('');
    const [allBuyers, setAllBuyers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const get_available_buyers = async () =>{
        try {
            const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/get_user_data');
      
            const data = await response.json();
            console.log(data)
            var available_buyers=[]
            data.forEach(function (item) {
                if (item["user_id"]!=current_user){
                    available_buyers.push({label:  item['user_id'],value: item['account_address']})
                }
              });
            setAllBuyers(available_buyers)
          } catch (err) {
            console.error(err);
          }
        }

    useEffect(()=> { get_available_buyers()},[])
    

    const  submitTransaction = async() =>{
        console.log('item: ',item);
        console.log('price: ',price);
        console.log('buyer data: ',buyer);
        if (item==''||Object.keys(buyer).length === 0){
            setMessage('Please name the item and choose a buyer');
            return;
        }
        setIsSubmitting(true);
        try {
            var body={
                'seller_address':address,
                'buyer_address':buyer['value'],
                'amount_eth': price,
                'item_name':item      
                };
            console.log("body: ",body)
            const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/issue_receipt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          const data = await response.json();
          console.log("transaction result: ",data)
          if (data.success){
            setMessage('Successfully Created Transaction')
            setItem("")
            setBuyer({})
            setPrice(0)
            onTransactionComplete()
          }
          else{
            setMessage('Error Creating Transaction')
          }
        } catch (error) {
            setMessage('Error: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }
  
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            minHeight: '40px',
            background: '#fff',
            borderColor: '#e2e8f0',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#cbd5e0'
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#4299e1' : state.isFocused ? '#ebf8ff' : null,
            ':active': {
                backgroundColor: '#4299e1'
            }
        })
    };

    return (
        <div className="transaction-card">
            <h2 className="transaction-title">Create New Transaction</h2>
            
            <div className="form-container">
                <div className="form-group">
                    <label className="form-label">Item Name</label>
                    <input 
                        type="text"
                        className="form-input"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="Enter item name"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Price (ETH)</label>
                    <input 
                        type="number"
                        className="form-input"
                        step="0.1"
                        min="0"
                        max="20"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        placeholder="0.0"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Select Buyer</label>
                    <Select
                        className="buyer-select"
                        options={allBuyers}
                        value={buyer}
                        onChange={(val) => setBuyer(val)}
                        styles={customSelectStyles}
                        placeholder="Choose a buyer..."
                        isSearchable
                    />
                </div>

                <button 
                    className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                    onClick={submitTransaction}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Creating...
                        </>
                    ) : 'Create Transaction'}
                </button>

                {message && (
                    <div className={`message ${message.includes('Success') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateTransaction; 
