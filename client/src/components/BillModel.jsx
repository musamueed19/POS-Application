import React, { useRef } from "react";
import { Modal, Table } from "antd";
import ReactToPrint from "react-to-print";

const { Column } = Table;

// Helper function moved outside component
const dateFormatter = (rawDate) => {
  // ... existing dateFormatter code ...
};

const BillModal = ({ billData, onClose }) => {
  const componentRef = useRef(null);

  return (
    <Modal onCancel={onClose} open={true} footer={false} width="100%">
      <div
        ref={componentRef}
        className="print-container" // Added for print styling
        style={{
          width: "100%",
          maxWidth: "800px", // Constrain width for print
          margin: "0 auto", // Center content
          padding: "20px",
          backgroundColor: "white", // Ensure white background
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-dashed pb-4">
          <h2 className="text-xl lg:text-2xl font-bold">
            Imran Bakers & General Store
          </h2>
          <div className="lg:text-[16px] font-medium">
            <p>Lahore, Pakistan</p>
            <a
              href="https://maps.app.goo.gl/drduhF87QtKphNGEA"
              target="_blank"
              rel="noopener noreferrer"
              className="print:hidden" // Hide in print
            >
              Poonch Rd, Samanabad Town, 54000
            </a>
            <span className="hidden print:inline">
              Poonch Rd, Samanabad Town, 54000
            </span>
            <p>
              <span className="print:hidden">📱</span>
              +92-3020949071
            </p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="flex flex-col lg:flex-row lg:justify-between font-medium mt-4 md:text-[16px]">
          {/* ... customer details ... */}
        </div>

        {/* Cart Items Table */}
        <Table
          pagination={false}
          dataSource={billData?.cartItems}
          rowKey={(record) => record._id}
          bordered
          className="capitalize my-4"
          size="small" // Better for print
        >
          {/* ... table columns ... */}
        </Table>

        {/* Totals */}
        <div className="font-medium lg:text-lg mt-6 mb-2 border-y border-dotted py-4">
          {/* ... totals ... */}
        </div>

        {/* Greeting */}
        <div className="w-full text-center text-lg print:mt-4">
          <p>Thanks</p>
          <p>Visit Again :)</p>
        </div>

        {/* Print Button */}
        <div className="flex justify-end my-2 print:hidden">
          <ReactToPrint
            trigger={() => (
              <button className="w-fit px-4 py-1 rounded-md bg-blue-600/90 hover:bg-blue-600 cursor-pointer text-white font-medium">
                Print Bill
              </button>
            )}
            content={() => componentRef.current}
            onBeforeGetContent={() =>
              new Promise((resolve) => setTimeout(resolve, 300))
            }
            pageStyle="@page { size: auto; margin: 5mm; }"
          />
        </div>
      </div>
    </Modal>
  );
};

export default BillModal;
