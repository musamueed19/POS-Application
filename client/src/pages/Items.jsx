// HomePage imprts
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Col, Form, message, Modal, Row } from "antd";
import Item from "../components/Item";
import Loader from "../components/Loader";

// Cart imports
import {
  Divider,
  Space,
  Table,
  Tag,
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Segmented,
  Select,
  TreeSelect,
} from "antd";
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
  PlusOutlined,
} from "@ant-design/icons";

// cartItems<Array> of CartItem
// CartItem {name, image, price, category}

// Form related imports & data
const categoryOptions = [
  { value: "dairy", label: "Dairy" },
  { value: "grains", label: "Grains" },
  { value: "food", label: "Food" },
  { value: "cereal", label: "Cereal" },
  { value: "candies", label: "Candies" },
  { value: "drinks", label: "Drinks" },
  { value: "fruit", label: "Fruit" },
  { value: "vegetables", label: "Vegetables" },
  { value: "accessories", label: "Accessories" },
  { value: "kitchen", label: "Kitchen" },
];

const unitWeightOptions = [
  { value: "gram", label: "Gram" },
  { value: "kg", label: "Kg" },
  { value: "litre", label: "Litre" },
  { value: "dozen", label: "Dozen" },
  { value: "ounce", label: "Ounce" },
  { value: "pound", label: "Pound" },
];

const Items = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // modal state
  const [modal, setModal] = useState(false);

  // modal type
  const [modalType, setModalType] = useState(null);
  // store ImageURL
  const [imageUrl, setImageUrl] = useState(null);

  // counter
  let i = 0;

  // Form related fields

  function getAllItems() {
    setIsLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v0/items?status=active,inactive,draft`
      )
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

  function onFinish(values) {
    console.log({
      ...values,
      updatedBy: "admin",
    });
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/v0/items`, {
        ...values,
        updatedBy: "admin",
      })
      .then((res) => {
        getAllItems();
        message.success(res?.data?.message);
        setModal(false);
      })
      .catch((err) => {
        message.error(
          err.response?.data?.message || err.message || "Failed to fetch items"
        );
      });
  }

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold uppercase text-red-600 underline underline-offset-4 decoration-4">
          Items
        </h3>

        {/* add item button */}
        <button
          onClick={() => {
            setModal(true);
            setModalType("addItem");
          }}
          className="font-semibold text-lg text-white bg-blue-500 px-2 py-1 rounded-md space-x-1 cursor-pointer hover:bg-blue-600/90 active:ring-4 active:ring-blue-200"
        >
          <PlusOutlined />
          Item
        </button>
      </div>

      {/* items table */}
      <Table
        dataSource={data}
        rowKey={(record) => record._id} // Use actual unique ID from your data
        bordered
        className="capitalize"
      >
        <Column title="Sr." render={(text, record, index) => index++ + 1} />
        <Column title="Name" dataIndex={"name"} />
        <Column
          title="Image"
          dataIndex={"image"}
          render={(image, record) => (
            <img
              onClick={() => {
                setModal(true);
                setModalType("viewImage");
                setImageUrl(image);
              }}
              className="rounded-md object-cover cursor-pointer"
              src={image}
              alt={record.name + "img"}
              height={"100"}
              width={"100"}
            />
          )}
        />
        <Column
          title="Category"
          dataIndex={"category"}
          sorter={(a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          } // Optional: keep sorting by category
        />
        <Column
          title="Unit Price"
          render={(record) => `${record.price} /${record.unitWeight}`}
          sorter={(a, b) => a.price - b.price} // Optional: keep sorting by price
        />
        <Column
          title="Quantity"
          dataIndex={"quantity"}
          sorter={(a, b) => a.quantity - b.quantity} // Optional: keep sorting by quantity
        />
        <Column
          title="Status"
          dataIndex={"status"}
          sorter={(a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          } // Optional: keep sorting by status
        />
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

      {/* Modal */}
      <Modal
        onCancel={() => setModal(false)}
        open={modal}
        footer={false}
        width={modalType === "viewImage" ? "60%" : undefined}
        style={{
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          {modalType === "viewImage" && (
            <div style={{ width: "100%", height: "100%" }}>
              <img
                className="rounded-md object-contain max-w-full max-h-full"
                src={imageUrl}
                alt={"item img"}
                style={{
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          )}
          {modalType === "addItem" && (
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <div className="text-center mt-4">
                  <h1 className="text-blue-500 font-bold text-3xl underline decoration-4 underline-offset-2">
                    Add New Item
                  </h1>
                </div>
              </Form.Item>

              {/* name */}
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input />
              </Form.Item>

              {/* image */}
              <Form.Item
                label="Image Link"
                name="image"
                rules={[{ required: true, message: "Image Link is required!" }]}
              >
                <Input />
              </Form.Item>

              {/* price */}
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Price is mandatory!" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              {/* weight */}
              <Form.Item
                label="Unit Weight"
                name="unitWeight"
                rules={[
                  { required: true, message: "Unit Weight is required!" },
                ]}
              >
                <Select
                  placeholder="Please select unit weight"
                  options={unitWeightOptions}
                />
              </Form.Item>

              {/* category */}
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select
                  placeholder="Please select category"
                  options={categoryOptions}
                />
              </Form.Item>

              {/* quantity */}
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "Quantity is mandatory!" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <div className="flex items-center justify-end gap-x-6">
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </>
      </Modal>
    </div>
  );
};

export default Items;
