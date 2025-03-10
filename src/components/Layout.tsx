import React, { useEffect, useState } from "react";
import { TeamOutlined, UserOutlined, GlobalOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import PlaneLogo from "../assets/planeflat.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { convertStringToTitleCase } from "../utils/helpers";
import { Outlet } from "react-router-dom";
import Popup from "./custom/ToastPopup";
import { Typography } from "antd";
import { useError } from "../context/ErrorHandlingContext";

const { Content, Sider } = Layout;

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
  getItem("Orders", "orders", <UserOutlined />),
  getItem("Users", "users", <TeamOutlined />),
  getItem("Shipping", "delivery", <GlobalOutlined />),
];

// interface BaseLayoutProps {
//   children: React.ReactNode;
// }

const BaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const { error, clearError } = useError();
 const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  
  //check for authentication and redirect to login page if not authenticated
  useEffect(() => {
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate('/');
    }
  }, []);

  const crumbs = location.pathname.split("/").filter((crumb) => crumb);

   

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
    navigate('/');
  }
  
 if (!isAuthenticated) {
    return <Typography.Text>Loading...</Typography.Text>;
  }
  return (
    <Layout className="h-screen w-screen">
      <Sider breakpoint="lg" collapsedWidth="0" style={{ background: "#fff" }}>
        <img
          src={PlaneLogo}
          alt="Plane Logo"
          style={{ width: "7rem", marginLeft: "1rem" }}
        />
        <Menu
          theme="light"
          defaultSelectedKeys={["orders"]}
          mode="inline"
          style={{}}
          onClick={handleNavigation}
          items={items}
        />
        <div className="absolute bottom-0  flex flex-row gap-4  m-8 text-black hover:font-semibold hover:text-blue-500 cursor-pointer"
         onClick={handleLogout}>
        <LogoutOutlined />
          <p >
            Log out
          </p>
          </div>
      </Sider>
      <Layout className="overflow-hidden">
        <Content style={{ margin: "0 16px" }}>
          {crumbs?.length !== 0 && (
            <Breadcrumb style={{ margin: "16px 0" }}>
              {crumbs.map((crumb, index) => (
                <Breadcrumb.Item key={index}>
                  {convertStringToTitleCase(crumb)}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
          <div className="p-4 pb-20 bg-white rounded-lg h-full overflow-y-auto">
            <Outlet />
          </div>
        </Content>
        <Popup isOpen={openPopup} onClose={() => {
          clearError();
          setOpenPopup(false)}}>
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
