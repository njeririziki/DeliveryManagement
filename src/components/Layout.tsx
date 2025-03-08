import React from "react";
import { TeamOutlined, UserOutlined, GlobalOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import PlaneLogo from "../assets/planeflat.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { convertStringToTitleCase } from "../utils/helpers";
import { Outlet } from "react-router-dom";


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
  getItem("Deliveries", "delivery", <GlobalOutlined />),
];

// interface BaseLayoutProps {
//   children: React.ReactNode;
// }

const BaseLayout= () => {
  const location = useLocation();
  const navigate = useNavigate();

  //check for authentication and redirect to login page if not authenticated

  const crumbs = location.pathname.split("/").filter((crumb) => crumb);

  const handleNavigation: MenuProps["onClick"] = (e) => {
    console.log(e.key);
    navigate(`/${e.key}`);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen w-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        
        style={{ background: colorBgContainer }}
      >
      
        <img
          src={PlaneLogo}
          alt="Plane Logo"
          style={{ width: "7rem", marginLeft: "1rem" }}
        />
        <Menu
          theme="light"
          defaultSelectedKeys={["orders"]}
          mode="inline"
          onClick={handleNavigation}
          items={items}
        />
      </Sider>
      <Layout>
   
        <Content style={{ margin: "0 16px" }}>
          {crumbs?.length !==0 && <Breadcrumb style={{ margin: "16px 0" }}>
            {crumbs.map((crumb, index) => (
              <Breadcrumb.Item key={index}>{convertStringToTitleCase(crumb)}</Breadcrumb.Item>
            ))}
          
          </Breadcrumb>
    }
          <div
            style={{
              padding: 24,
              minHeight: "90%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
