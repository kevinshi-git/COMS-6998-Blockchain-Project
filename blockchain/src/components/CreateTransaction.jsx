import Select from 'react-select';
import { useEffect, useState } from 'react';




function CreateTransaction({current_user, address}){
    const [price, setPrice] = useState(0);
    const [item, setItem] = useState('');
    const [buyer,setBuyer] = useState({});
    const [message,setMessage] = useState('');
    const [allBuyers,setAllBuyers]=useState([]);
    
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
      }
      else{
        setMessage('Error Creating Transaction')
      }
        setItem("")
    }
  
      return (<div id='transactioncontainer' style={{color: 'black', border: 'solid black'}}>
        <div id='transactionrow'>
        <label id='transaction_item_label'>Transaction Item:      </label>
        <input type='text' id='item_input' value={item} onChange={(e) => setItem(e.target.value)}></input>
        </div>
  
        <div id='transactionrow'>
        <label id='transaction_item_price'>Price (in ETH):      </label>
        <input type='number'
                step='0.1'
                min='0'
                max='20' 
                id='item_input' 
                placeholder='0'
                onChange={(e) => setPrice(parseFloat(e.target.value))}></input>
        </div>
  
  
        <div id='transactionrow'>
        <label id='transaction_item_buyer'>Buyer:      </label>
        <Select name='form-field-name' options={allBuyers} onChange={(val) => setBuyer(val)}/>      
        </div>

        <div id='transactionrow'>
        <button onClick={submitTransaction}>Submit</button>
        </div>

        <div id='response_message'>{message}</div>
  
  
        </div>)
    }

export default CreateTransaction; 
