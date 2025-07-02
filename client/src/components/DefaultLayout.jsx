import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PrinterOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

// Link
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// menuItems <Array>
const size = 24;

// component
const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useNavigate
  const navigate = useNavigate();
  
  // getting, cartItems, from the rootReducer, and localStorage
  const { cartItems } = useSelector((state) => state.rootReducer);
  
  // dispatch
  const dispatch = useDispatch();
  
  
  // add/update cartItems in the localStorage too, when changed in the cartItems Redux state
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined size={size} />,
      label: <Link to={"/home"}>Home</Link>,
    },
    {
      key: "/bills",
      icon: <PrinterOutlined size={size} />,
      label: <Link to={"/bills"}>Bills</Link>,
    },
    {
      key: "/items",
      icon: <UnorderedListOutlined size={size} />,
      label: <Link to={"/items"}>Items</Link>,
    },
    {
      key: "/customers",
      icon: <UserOutlined size={size} />,
      label: <Link to={"/customers"}>Customers</Link>,
    },
    {
      key: "/logout",
      icon: <LogoutOutlined size={size} />,
      label: (
        <button
          onClick={(e) => {
            e.preventDefault();
            logoutHandler();
          }}
          className="cursor-pointer"
        >
          Logout
        </button>
      ),
    },
  ];
  // function logouthandler
  function logoutHandler() {
    // dispatch({ type: "logout", payload: null });
    localStorage.removeItem("user")
    navigate('/login')
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
        // minWidth: "fit-content",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h1
          className={`${
            collapsed ? "text-xl" : "text-4xl"
          } text-[#28c6ff] transition-all font-bold text-center mt-[1rem] mb-[3rem]`}
        >
          IG <span>POS</span>
        </h1>
        <Menu
          className="menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={menuItems}
        />
      </Sider>
      <Layout
        style={{
          minHeight: "100vh",
          // minWidth: "fit-content",
          maxWidth: "100vw",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            // minWidth: "fit-content",
          }}
        >
          {/* parent div container */}
          <div className="flex justify-between items-center pr-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
                width: 64,
                height: 64,
              }}
            />

            {/* Cart Icon */}
            <button
              onClick={() => navigate("/cart")}
              className="text-3xl cursor-pointer flex items-center justify-between relative active:bg-gray-200/80 p-1 rounded-md text-gray-600"
            >
              <ShoppingOutlined />
              {/* <span className="text-sm fixed top-4 right-6 font-medium text-white bg-red-600 rounded-md w-[25px]">2</span> */}
              <span className="flex items-center justify-center text-[12px] bg-red-600 text-white font-medium w-[1.2rem] h-[1.2rem] rounded-full absolute top-1 -right-0.5">
                {cartItems.length}
              </span>
            </button>
          </div>
        </Header>
        <Content
          style={{
            // margin: "10px 0 0 10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
