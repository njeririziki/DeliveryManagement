import React, { useEffect, useState } from "react";
import {
  TeamOutlined,
  GlobalOutlined,
  LogoutOutlined,
  FileTextOutlined,

} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {  Layout, Menu, theme  } from "antd";
import PlaneLogo from "../assets/planeflat.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Popup from "./custom/ToastPopup";
import { Typography } from "antd";
import { useError } from "../context/ErrorHandlingContext";

const {Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Orders", "orders", <FileTextOutlined />),
  getItem("Users", "users", <TeamOutlined />),
  getItem("Deliveries", "delivery", <GlobalOutlined />),
];

const BaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState("orders");
  const { error, clearError } = useError();
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  //check for authentication and redirect to login page if not authenticated
  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/").filter((crumb) => crumb);
    if(path[0]=== 'orderdetails') return setCurrentMenuItem('orders');
    setCurrentMenuItem(path[0]);
  }, [location]);

  useEffect(() => {
    if (error) {
      setOpenPopup(true);
      setTimeout(() => {
        setOpenPopup(false);
        clearError();
      }, 2000);
    }
  }, [error, clearError]);

  const handleNavigation: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const {
    token: { colorBgContainer},
  } = theme.useToken();

  if (!isAuthenticated) {
    return <Typography.Text>Loading...</Typography.Text>;
  }
  return (
    <Layout className="h-screen w-screen">
      <Sider breakpoint="lg" collapsedWidth="0"     
      style={{ background: "#fff" }}>
        <div className="bg-white h-screen flex flex-col justify-between">
       <div>
        <img
          src={PlaneLogo}
          alt="Plane Logo"
          style={{ width: "7rem", height:'3rem', marginLeft: "1rem" }}
        />
        <Menu
          theme="light"
          selectedKeys={[currentMenuItem]}
          mode="inline"
          style={{}}
          onClick={handleNavigation}
          items={items}
        />
        </div>
       <div
          className=" flex flex-row gap-4 m-8 text-black hover:font-semibold hover:text-blue-500 cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutOutlined />
          <p>Log out</p>
        </div>
        </div>
      </Sider>
      <Layout className="overflow-hidden">
      <Header 
      style={{ padding: 0, background: colorBgContainer }}
      className="flex justify-end items-center bg-white px-4">
    
 
        </Header>
        <Content className="m-4">
          <div className="p-4 pb-20 bg-white rounded-lg h-full overflow-y-auto">
            <Outlet />
          </div>
        </Content>
        <Popup
          isOpen={openPopup}
          onClose={() => {
            clearError();
            setOpenPopup(false);
          }}
        >
          <Typography.Title level={5} type="danger">
            Error
          </Typography.Title>
          <Typography.Text type="danger">{error}</Typography.Text>
        </Popup>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
