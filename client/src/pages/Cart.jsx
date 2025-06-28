import React from "react";
import { Divider, Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";
const { Column, ColumnGroup } = Table;

// import antdicon
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

// cartItems<Array> of CartItem
// CartItem {name, image, price, category}

const Cart = () => {
  // getting, cartItems, from the rootReducer, and localStorage
  const { cartItems } = useSelector((state) => state.rootReducer);

  // counter
  let i = 1;

  return (
    <Table dataSource={cartItems} rowKey={() => i++} bordered>
      <Column title="Sr." render={() => i} />
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
      <Column title="Name" dataIndex={"name"} />
      <Column title="Price" dataIndex={"price"} />
      <Column
        title="Quantity"
        dataIndex={"_id"}
        render={(id, record) => (
          <div className="text-xl space-x-2 text-gray-500">
            <MinusCircleOutlined className="cursor-pointer" />
            <span className="font-bold text-gray-600">{record.quantity || 0}</span>
            <PlusCircleOutlined className="cursor-pointer" />
          </div>
        )}
      />
      <Column
        title="Action"
        dataIndex={"_id"}
        render={(id, record) => (
          <button className="text-xl cursor-pointer text-red-600 active:bg-red-100 p-1 px-2 rounded-md">
            <DeleteOutlined />
          </button>
        )}
      />
    </Table>
  );
};
export default Cart;
