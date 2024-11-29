import Select from 'react-select';
import { useEffect, useState } from 'react';


function ActionButton({transaction_hash, is_seller,return_deadline, receipt_status}){
    const [text, setText] = useState("");

    const doAction = async () =>{
        console.log(transaction_hash, is_seller,return_deadline)
        if (is_seller){
            var endpoint="/release_funds"
        }else{
            var endpoint="/request_return"}
        var body={'transaction_hash':transaction_hash}
        try {
            const response = await fetch('https://w6998-backend-2-745799261495.us-east4.run.app/'+endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
      
            const data = await response.json();
            console.log(endpoint+" result: ",data)
            if (data.success){
                setText("success!")
            }
            else{
                setText("Error")
            }
            
          } catch (err) {
            console.log(endpoint+" error: ",err);
          }
    }
    var button_text='release funds'
    if (!is_seller){
        var button_text='return item'
    }
    var current_date = new Date()

    if (receipt_status!='Active'||(is_seller && current_date<return_deadline) || (!is_seller && current_date>return_deadline)){
        return (<div></div>)
    }

    return ( <div>
        <button onClick={e => {e.stopPropagation();doAction();}}>{button_text}</button>
        <div style={{color: 'black'}}>{text}</div>
        </div>
    )
}


export default ActionButton; 
