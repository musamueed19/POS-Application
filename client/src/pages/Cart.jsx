import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
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
import axios from "axios";

// loader
import Loader from '../components/Loader'

// cartItems<Array> of CartItem
// CartItem {name, image, price, category}

const Cart = () => {
  const navigate = useNavigate();

  // getting, cartItems, from the rootReducer, and localStorage
  const { cartItems } = useSelector((state) => state.rootReducer);


  // const subtotal
  const [subTotal, setSubTotal] = useState(0);
  let tax = 8.2;

  // counter
  // let i = 1;

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
      payload: {
        ...record,
        quantity: record.quantity > 1 ? record.quantity - 1 : record.quantity,
      },
    });
  }

  // deleteFromCart

  // UseEffect
  useEffect(() => {
    let temp = 0;

    // get all price
    cartItems.forEach((item) => {
      temp += item.quantity * item.price;
    });

    setSubTotal(temp);
  }, [cartItems]);

  // bill modal
  const [modal, setModal] = useState(false);

  // isPending
  const [isPending, setIsPending] = useState(false);

  // onFinish
  function onFinish(values) {
    setIsPending(true);

    const payload = {
      ...values,
      subTotal,
      tax: ((subTotal * tax) / 100).toFixed(2),
      grandTotal: +(subTotal - (subTotal * tax) / 100),
      updatedBy: JSON.parse(localStorage.getItem("user"))._id,
      cartItems,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/v0/bills`, payload)
      .then((res) => {
        message.success(res?.data?.message);
        localStorage.removeItem('cartItems');
        dispatch({type: 'removeAllItems'})
        setModal(false);
        setIsPending(false);
      })
      .catch((err) => {
        message.error(
          err.response?.data?.message || err.message || "Failed to delete item"
        );
        setIsPending(false);
      });

    // console.log(payload);
  }

  return (
    <>
      <div
        onClick={() => navigate(-1)}
        className="flex text-lg items-center font-semibold bg-blue-500/90 hover:bg-blue-500 cursor-pointer text-white px-2 w-fit rounded-md gap-x-1 mb-6"
      >
        <ArrowLeftOutlined />
        Back
      </div>
      <Table
        dataSource={cartItems}
        rowKey={(record) => record._id}
        bordered
        className="capitalize"
      >
        <Column title="Sr." render={(text, record, index) => index++ + 1} />
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

      {/* <hr className="mt-4" /> */}

      {/* subtotal */}
      <div className="flex flex-col md:items-end">
        <p className="text-xl md:text-2xl font-bold mt-6">
          Sub Total:
          <span className="ml-2 font-semibold">{subTotal}/-</span>
        </p>

        <button
          className="w-fit mt-4 text-base px-3 py-1 font-semibold text-white bg-blue-600/90 hover:bg-blue-600 rounded-md cursor-pointer"
          onClick={() => setModal(true)}
        >
          CHARGE BILL
        </button>
      </div>

      <Modal
        onCancel={() => setModal(false)}
        open={modal}
        footer={false}
        className="w-[95%] md:w-[80%] lg:w-[70%]"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="text-center mt-4">
              <h1
                className={`text-blue-500 font-bold text-3xl underline decoration-4 underline-offset-2 capitalize`}
              >
                Charge Bill
              </h1>
            </div>
          </Form.Item>
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Phone # is required!" }]}
          >
            <Input />
          </Form.Item>

          {/* Payment Mode */}
          <Form.Item
            label="Payment Mode"
            name="paymentMode"
            rules={[{ required: true, message: "Payment mode is required!" }]}
          >
            <Select
              placeholder="Please select payment mode"
              options={[
                { label: "Cash", value: "cash" },
                { label: "Online", value: "online" },
              ]}
            />
          </Form.Item>

          {/* Labels */}

          <div>
            <p className="text-xl font-semibold flex justify-between md:w-[60%]">
              SubTotal: <span className="font-medium">{subTotal}</span>
            </p>
            <p className="text-xl font-semibold flex justify-between md:w-[60%]">
              Tax: <span className="font-medium">{((subTotal * tax) / 100).toFixed(2)}</span>
            </p>
            <hr className="my-2" />
            <p className="text-2xl font-bold flex justify-between md:w-[65%]">
              Grand Total:{" "}
              <span className="font-semibold">
                {subTotal + (subTotal * tax) / 100} /-
              </span>
            </p>
          </div>

          {/*  */}
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex items-center justify-end gap-x-6 mt-6">
              <Button type="primary" htmlType="submit" disabled={isPending}>
                {isPending ? <Loader isPending={true} /> : "Generate Bill"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Cart;
