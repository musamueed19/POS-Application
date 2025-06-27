import React, { useState } from "react";
import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PrinterOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;

// Link
import { Link } from "react-router-dom";


// menuItems <Array>
const size=24
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
    label: <Link to={"/"}>Logout</Link>,
  },
];


// component
const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
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
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "10px 0 0 10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
