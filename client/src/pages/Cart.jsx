import React from "react";
import { Divider, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Column, ColumnGroup } = Table;

// import antdicon
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// cartItems<Array> of CartItem
// CartItem {name, image, price, category}

const Cart = () => {

  const navigate = useNavigate();

  // getting, cartItems, from the rootReducer, and localStorage
  const { cartItems } = useSelector((state) => state.rootReducer);

  // counter
  let i = 1;

  // useDispatch instance
  const dispatch = useDispatch();

  // increaseQuantity
  function increaseQuantity(record) {
    dispatch({
      type: "updateQuantity",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  }

  // decreaseQuantity
  function decreaseQuantity(record) {
    dispatch({
      type: "updateQuantity",
      payload: { ...record, quantity: record.quantity - 1 },
    });
  }

  // deleteFromCart

  return (
    <>
    <div onClick={() => navigate(-1)} className="flex text-lg items-center font-semibold bg-blue-500/90 hover:bg-blue-500 cursor-pointer text-white px-2 w-fit rounded-md gap-x-1 mb-6">
      <ArrowLeftOutlined />
      Back
    </div>
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
        <Column title="Unit Price" dataIndex={"price"} />
        <Column
          title="Quantity"
          dataIndex={"_id"}
          render={(id, record) => (
            <div className="text-xl space-x-2 text-gray-500">
              <MinusCircleOutlined
                className="cursor-pointer"
                onClick={() => decreaseQuantity(record)}
              />
              <span className="font-bold text-gray-600">{record.quantity}</span>
              <PlusCircleOutlined
                className="cursor-pointer"
                onClick={() => increaseQuantity(record)}
              />
            </div>
          )}
        />
        <Column
          title="Action"
          dataIndex={"_id"}
          render={(id, record) => (
            <button className="text-xl cursor-pointer text-red-600 active:bg-red-100 p-1 px-2 rounded-md">
              <DeleteOutlined
                onClick={() =>
                  dispatch({ type: "deleteFromCart", payload: record["_id"] })
                }
              />
            </button>
          )}
        />
      </Table>
    </>
  );
};
export default Cart;
