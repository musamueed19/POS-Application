import React, { useEffect, useState } from "react";

import axios from "axios";
import { Modal, Table } from "antd";
import Loader from "../components/Loader";

import { Link } from "react-router-dom";

const { Column } = Table;

// antd icons
import { EyeOutlined, WhatsAppOutlined } from "@ant-design/icons";

// import ReactToPrint
import ReactToPrint, { useReactToPrint } from "react-to-print";

const Customers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);



  function getAllCustomers() {
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
    getAllCustomers();
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



  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold uppercase text-red-600 underline underline-offset-4 decoration-4">
          Customers
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
          title="Created On"
          dataIndex="updatedAt"
          sorter={(a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)}
          render={(updatedAt) => {
            const date = dateFormatter(updatedAt);

            return <span className="">{date}</span>;
          }}
        />
      </Table>
    </div>
  );
};

export default Customers;
