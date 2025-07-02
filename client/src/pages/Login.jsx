import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// auth background
import authBackground from "../assets/authBg.svg";

// loader
import Loader from "../components/Loader";

// dispatch
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  // isPending state
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.rootReducer);

  // onFinish function
  const onFinish = (values) => {
    setIsPending(true); // Move here
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v0/users`,
        values
        // {
        // validateStatus: (status) => status < 500, // Don't throw for 400-499 errors
        // }
      )
      .then((res) => {
        message.success(res?.data?.message);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        // dispatch({ type: "login", payload: res?.data?.user });

        navigate("/home");
        setIsPending(false); // Move here
      })
      .catch((err) => {
        // console.clear(); // Clears all console errors (use carefully!)
        message.error(
          err.response?.data?.message || err.message || "Failed to add item"
        );
        setIsPending(false); // And here
      });
  };

  // const { user } = useSelector((state) => state.rootReducer);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/home");
    // Small delay to ensure Redux state is loaded
    const timer = setTimeout(() => setIsCheckingAuth(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isCheckingAuth) return <Loader />; // Show loader while checking auth

  return (
    <div
      className={`flex items-center justify-center h-screen bg-[url(${authBackground})] bg-center bg-cover`}
    >
      <div className="w-screen h-screen flex flex-col md:block justify-center md:w-[60vw] lg:w-[35vw] md:h-fit bg-white p-4 lg:px-6 rounded-md">
        <h1 className="text-[2.9rem] font-bold w-full text-center border-b-2 pb-4 text-[#009bc6]">
          IGPOS
        </h1>
        <Form layout="vertical" onFinish={onFinish} style={{ width: "100%" }}>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="text-start mt-4">
              <h1
                className={`text-blue-500 font-bold text-3xl underline decoration-4 underline-offset-2 uppercase`}
              >
                Login
              </h1>
            </div>
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
                Don't have an account?{" "}
                <Link to={"/register"} className="underline text-blue-500">
                  Click here to Register
                </Link>
              </span>
              <Button type="primary" htmlType="submit" disabled={isPending}>
                {isPending ? <Loader isPending={true} /> : "Login"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
