import { Button, Form, Input } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";

// auth background
import authBackground from '../assets/authBg.svg'

const Register = () => {

    // isPending state
    const [isPending, setIsPending] = useState(false)


  // onFinish function
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div
      className={`flex items-center justify-center h-screen bg-[url(${authBackground})] bg-center bg-cover`}
    >
      <div className="w-screen h-screen flex md:block items-center md:w-[60vw] lg:w-[35vw] md:h-fit bg-white p-4 lg:px-6 rounded-md">
        <Form layout="vertical" onFinish={onFinish} style={{width: '100%'}} >
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="text-start mt-4">
              <h1
                className={`text-blue-500 font-bold text-3xl underline decoration-4 underline-offset-2 uppercase`}
              >
                Register
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

          {/* email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required!" }]}
          >
            <Input />
          </Form.Item>

          {/* password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input type="password" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex flex-col md:flex-row items-start justify-between gap-x-6 mt-6">
              <span className="font-medium">
                Already have an account?{" "}
                <Link to={"/login"} className="underline text-blue-500">
                  Click here to Login
                </Link>
              </span>
              <Button type="primary" htmlType="submit" disabled={isPending}>
                {isPending ? <Loader isPending={true} /> : "Sign Up"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
