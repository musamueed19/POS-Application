import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

// Printable receipt component with forwarded ref
const PrintableReceipt = React.forwardRef(({ receiptData }, ref) => (
  <div
    ref={ref}
    style={{
      width: "80mm", // Standard receipt width
      padding: "10px",
      fontFamily: "'Arial', sans-serif",
      fontSize: "14px",
      "@media print": {
        padding: 0,
        margin: 0,
        width: "100%",
      },
    }}
  >
    {/* Store Header */}
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      <h2 style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold" }}>
        {receiptData.storeName}
      </h2>
      <p style={{ margin: "3px 0", fontSize: "12px" }}>{receiptData.address}</p>
      <p style={{ margin: "3px 0", fontSize: "12px" }}>{receiptData.phone}</p>
    </div>

    {/* Transaction Info */}
    <div
      style={{
        marginBottom: "15px",
        borderBottom: "1px dashed #ccc",
        paddingBottom: "10px",
      }}
    >
      <p style={{ margin: "3px 0" }}>
        <strong>Date:</strong> {receiptData.date}
      </p>
      <p style={{ margin: "3px 0" }}>
        <strong>Receipt #:</strong> {receiptData.receiptNumber}
      </p>
    </div>

    {/* Items Table */}
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "15px",
        fontSize: "13px",
      }}
    >
      <thead>
        <tr style={{ borderBottom: "1px dashed #ccc" }}>
          <th style={{ textAlign: "left", padding: "4px 0" }}>Item</th>
          <th style={{ textAlign: "right", padding: "4px 0" }}>Price</th>
          <th style={{ textAlign: "right", padding: "4px 0" }}>Qty</th>
          <th style={{ textAlign: "right", padding: "4px 0" }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {receiptData.items.map((item, index) => (
          <tr key={index} style={{ borderBottom: "1px dashed #eee" }}>
            <td style={{ padding: "4px 0" }}>{item.name}</td>
            <td style={{ textAlign: "right", padding: "4px 0" }}>
              ${item.price.toFixed(2)}
            </td>
            <td style={{ textAlign: "right", padding: "4px 0" }}>
              {item.quantity}
            </td>
            <td style={{ textAlign: "right", padding: "4px 0" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Totals */}
    <div style={{ textAlign: "right", marginBottom: "15px" }}>
      <p style={{ margin: "5px 0" }}>
        <strong>Subtotal:</strong> ${receiptData.subtotal.toFixed(2)}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Tax ({receiptData.taxRate}%):</strong> $
        {receiptData.tax.toFixed(2)}
      </p>
      <p style={{ margin: "5px 0", fontWeight: "bold", fontSize: "15px" }}>
        <strong>Total:</strong> ${receiptData.total.toFixed(2)}
      </p>
    </div>

    {/* Footer */}
    <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>
      <p style={{ margin: "5px 0" }}>Thank you for your business!</p>
      <p style={{ margin: "5px 0" }}>{receiptData.returnPolicy}</p>
    </div>
  </div>
));

const PrintTestComponent = () => {
  const componentRef = useRef();

  // Sample receipt data
  const receiptData = {
    storeName: "Test Store",
    address: "123 Main St, Test City",
    phone: "+1 234 567 8900",
    date: new Date().toLocaleString(),
    receiptNumber: Math.floor(Math.random() * 1000000),
    items: [
      { name: "Item 1", price: 10, quantity: 2 },
      { name: "Item 2", price: 15, quantity: 1 },
      { name: "Item 3", price: 5, quantity: 3 },
    ],
    subtotal: 50,
    taxRate: 10,
    tax: 5,
    total: 55,
    returnPolicy: "Returns accepted within 14 days with receipt",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Receipt Printer</h1>

      {/* Print Button */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <ReactToPrint
          trigger={() => (
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              Print Receipt
            </button>
          )}
          content={() => componentRef.current}
          pageStyle={`
            @page {
              size: 80mm auto;
              margin: 0;
            }
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-area, #printable-area * {
                visibility: visible;
              }
              #printable-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 80mm;
                margin: 0;
                padding: 10px;
              }
            }
          `}
          onAfterPrint={() => console.log("Print completed")}
        />
      </div>

      {/* Preview Area */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <PrintableReceipt ref={componentRef} receiptData={receiptData} />
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          fontSize: "14px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Instructions:</h3>
        <ol>
          <li>Click "Print Receipt" button to open print dialog</li>
          <li>Ensure your thermal printer is selected</li>
          <li>Set paper size to 80mm width</li>
          <li>Print with no margins if possible</li>
        </ol>
      </div>
    </div>
  );
};

export default PrintTestComponent;
