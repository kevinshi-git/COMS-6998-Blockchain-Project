import { useState } from 'react';
import './Receipt.css';

const Receipt = ({ receipt }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h2>Transaction Receipt</h2>
        <span className={`status-badge ${receipt.status === 'Success' ? 'success' : 'failed'}`}>
          {receipt.status}
        </span>
      </div>

      <div className="receipt-body">
        <div className="receipt-row">
          <div className="receipt-label">Amount</div>
          <div className="receipt-value">{receipt.amount} ETH</div>
        </div>

        <div className="receipt-row">
          <div className="receipt-label">Purchase Time</div>
          <div className="receipt-value">{formatDate(receipt.purchase_time)}</div>
        </div>

        <div className="receipt-row clickable" onClick={() => copyToClipboard(receipt.buyer_address)}>
          <div className="receipt-label">Buyer Address</div>
          <div className="receipt-value">
            {formatAddress(receipt.buyer_address)}
            <span className="copy-icon">📋</span>
          </div>
        </div>

        <div className="receipt-row clickable" onClick={() => copyToClipboard(receipt.seller_address)}>
          <div className="receipt-label">Seller Address</div>
          <div className="receipt-value">
            {formatAddress(receipt.seller_address)}
            <span className="copy-icon">📋</span>
          </div>
        </div>

        <div className="receipt-row clickable" onClick={() => copyToClipboard(receipt.seller_contract_address)}>
          <div className="receipt-label">Contract Address</div>
          <div className="receipt-value">
            {formatAddress(receipt.seller_contract_address)}
            <span className="copy-icon">📋</span>
          </div>
        </div>

        <div className="receipt-row clickable" onClick={() => copyToClipboard(receipt.transaction_hash)}>
          <div className="receipt-label">Transaction Hash</div>
          <div className="receipt-value">
            {formatAddress(receipt.transaction_hash)}
            <span className="copy-icon">📋</span>
          </div>
        </div>

        <div className="receipt-row">
          <div className="receipt-label">Block Number</div>
          <div className="receipt-value">{receipt.block_number}</div>
        </div>

        <div className="receipt-row">
          <div className="receipt-label">Receipt Index</div>
          <div className="receipt-value">{receipt.receipt_index}</div>
        </div>
      </div>

      {copied && <div className="copy-notification">Copied to clipboard!</div>}
    </div>
  );
};

export default Receipt; 