import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Modal, Table } from "antd";
import Loader from "../components/Loader";

import { Link } from "react-router-dom";

const { Column } = Table;

// antd icons
import { EyeOutlined, WhatsAppOutlined } from "@ant-design/icons";


// import ReactToPrint
import ReactToPrint, { useReactToPrint } from "react-to-print"

const Bills = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  // bill reciept ref
  const billReceiptRef = useRef(null); 

  // modal
  const [modal, setModal] = useState(false);
  const [billData, setBillData] = useState(null);

  function getAllBills() {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v0/bills`)
      .then((res) => {
        setData(res?.data?.message);
        setError("");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch items"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllBills();
  }, []);

  function dateFormatter(rawDate) {
    const date = new Date(rawDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }


  // handle Print
  const handlePrint = useReactToPrint({
    contentRef: billReceiptRef
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold uppercase text-red-600 underline underline-offset-4 decoration-4">
          Bills
        </h3>
      </div>

      {/* items table */}
      <Table
        dataSource={data}
        rowKey={(record) => record._id} // Use actual unique ID from your data
        bordered
        className="capitalize"
      >
        <Column title="Sr." render={(text, record, index) => index++ + 1} />
        <Column title="Customer Name" dataIndex={"customerName"} />
        <Column title="Phone #" dataIndex={"phoneNumber"} />
        <Column
          title="SubTotal"
          dataIndex={"subTotal"}
          sorter={(a, b) => a.subTotal - b.subTotal} // Optional: keep sorting by subTotal
        />
        <Column
          title="Tax"
          dataIndex={"tax"}
          sorter={(a, b) => a.tax - b.tax} // Optional: keep sorting by tax
        />
        <Column
          title="Total"
          dataIndex={"grandTotal"}
          sorter={(a, b) => a.grandTotal - b.grandTotal} // Optional: keep sorting by grandTotal
        />
        <Column title="Payment" dataIndex={"paymentMode"} />
        <Column
          title="Created On"
          dataIndex="updatedAt"
          sorter={(a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)}
          render={(updatedAt) => {
            const date = dateFormatter(updatedAt);

            return <span className="uppercase">{date}</span>;
          }}
        />

        {/* Action */}
        <Column
          title="Action"
          dataIndex={"_id"}
          render={(id, record) => (
            <div className="text-xl">
              <button
                className="text-xl cursor-pointer text-blue-600 active:bg-blue-100 p-1 px-2 rounded-md"
                onClick={() => {
                  setModal(true);
                  setBillData(record);
                }}
              >
                <EyeOutlined />
              </button>
            </div>
          )}
        />
      </Table>

      <Modal
        onCancel={() => setModal(false)}
        open={modal}
        footer={false}
        // className="w-[95%] md:w-[80%] lg:w-[70%]"
        width={"100%"}
      >
        {/* conatiner */}
        <div className="my-4 mx-auto md:w-[95%]" ref={billReceiptRef}>
          {/* <div className="px-2"> */}
            {/* header */}
            <div className="flex justify-between items-center border-b border-dashed pb-4">
              <h2 className="text-xl lg:text-2xl font-bold">
                Imran Bakers & General Store
              </h2>

              {/* address */}
              <div className="lg:text-[16px] font-medium">
                <p>Lahore, Pakistan</p>
                <Link
                  to={"https://maps.app.goo.gl/drduhF87QtKphNGEA"}
                  target="_blank"
                >
                  Poonch Rd, Samanabad Town, 54000
                </Link>
                <p>
                  <WhatsAppOutlined /> +92-3020949071
                </p>
              </div>
            </div>

            {/* Customer Details & Cashier Details */}
            <div className="flex flex-col lg:flex-row lg:justify-between font-medium mt-4 md:text-[16px]">
              <div>
                <div>
                  <p>
                    Customer Name:
                    <span className="font-normal ml-2 text-sm">
                      {billData?.customerName}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Phone #:
                    <span className="font-normal ml-2 text-sm">
                      {billData?.phoneNumber}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Date:
                    <span className="font-normal ml-2 text-sm">
                      {dateFormatter(billData?.updatedAt)}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <p>
                    Bill ID:
                    <span className="font-normal ml-2 text-sm">
                      {billData?._id}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Cashier ID:
                    <span className="font-normal ml-2 text-sm">
                      {billData?.updatedBy}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Payment Mode:
                    <span className="font-normal ml-2 text-sm capitalize">
                      {billData?.paymentMode}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* cart Items */}
            <Table
              pagination={false}
              dataSource={billData?.cartItems}
              rowKey={(record) => record._id}
              bordered
              className="capitalize my-4"
            >
              <Column
                title="Sr."
                render={(text, record, index) => index++ + 1}
              />
              <Column title="Name" dataIndex={"name"} />
              <Column title="Unit Price" dataIndex={"price"} />
              <Column title="Quantity" dataIndex={"quantity"} />
              <Column
                title="Total Price"
                dataIndex={"_id"}
                render={(text, record) => record.price * record.quantity}
              />
            </Table>
            {/* subTotal & other bill amount */}
            <div className="font-medium lg:text-lg mt-6 mb-2 border-y border-dotted py-4">
              <p>
                Sub Total:{" "}
                <span className="font-normal">{billData?.subTotal}</span>
              </p>
              <p>
                Tax: <span className="font-normal">{billData?.tax}</span>
              </p>
            </div>
            <p className="text-xl font-bold">
              Grand Total:{" "}
              <span className="font-normal">{billData?.grandTotal}/-</span>
            </p>

            {/* Greeting */}

            <div className="w-full text-center text-lg">
              <p>Thanks</p>
              <p>Visit Again :)</p>
            </div>
            {/* Print Bill - btn */}
            <div className="flex justify-end my-2">
              <button
                onClick={handlePrint}
                className="w-fit px-4 py-1 rounded-md bg-blue-600/90 hover:bg-blue-600 cursor-pointer text-white font-medium"
              >
                Print Bill
              </button>
            </div>
          {/* </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default Bills;
