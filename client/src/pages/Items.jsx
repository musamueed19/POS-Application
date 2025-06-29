// HomePage imprts
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Col, Form, Modal, Row } from "antd";
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
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Items = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // modal state
  const [modal, setModal] = useState(false);

  // counter
  // let i = 0;


  // Form related fields
  
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);

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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold uppercase text-red-600 underline underline-offset-4 decoration-4">
          Items
        </h3>

        {/* add item button */}
        <button
          onClick={() => setModal(true)}
          className="font-semibold text-lg text-white bg-blue-500 px-2 py-1 rounded-md space-x-1 cursor-pointer hover:bg-blue-600/90 active:ring-4 active:ring-blue-200"
        >
          <PlusOutlined />
          Item
        </button>
      </div>

      {/* items table */}
      <Table
        dataSource={data}
        rowKey={() => {
          let i = 0;
          return i++;
        }}
        bordered
        className="capitalize"
      >
        <Column
          title="Sr."
          render={() => {
            let i = 0;
            return i++;
          }}
        />
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

      {/* Modal */}
      <Modal onCancel={() => setModal(false)} visible={modal} footer={false}>
        <Form
          layout="vertical"
          form={form}
          style={{ maxWidth: 500 }}
          initialValues={{ variant: "filled" }}
        >
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="text-center mt-4">
              <h1 className="text-blue-500 font-bold text-3xl">Add New Item</h1>
            </div>
          </Form.Item>


          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image Link"
            name="image"
            rules={[{ required: true, message: "Image Link is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is mandatory!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select />
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
      </Modal>
    </div>
  );
};

export default Items;
