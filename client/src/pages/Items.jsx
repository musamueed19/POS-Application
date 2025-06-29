// HomePage imprts
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import Loader from "../components/Loader";

// Cart imports
import { Divider, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Column, ColumnGroup } = Table;

// import antdicon
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined
} from "@ant-design/icons";

// cartItems<Array> of CartItem
// CartItem {name, image, price, category}

// counter
let i = 0;

const Items = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function getAllItems() {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v0/items`)
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
    getAllItems();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Table dataSource={data} rowKey={() => i++} bordered className="capitalize">
        <Column title="Sr." render={() => i} />
        <Column title="Name" dataIndex={"name"} />
        <Column
          title="Image"
          dataIndex={"image"}
          render={(image, record) => (
            <img
              className="rounded-md object-cover"
              src={image}
              alt={record.name + "img"}
              height={"100"}
              width={"100"}
            />
          )}
        />
        <Column title="Category" dataIndex={"category"} sorter />
        <Column title="Unit Price" dataIndex={"price"} />
        <Column
          title="Action"
          dataIndex={"_id"}
          render={(id, record) => (
            <div className="text-xl">
              <button className="text-xl cursor-pointer text-blue-600 active:bg-blue-100 p-1 px-2 rounded-md">
                <EditOutlined />
              </button>
              <button className="text-xl cursor-pointer text-red-600 active:bg-red-100 p-1 px-2 rounded-md">
                <DeleteOutlined />
              </button>
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default Items;
