// icon
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import "./Layout.scss";
export default function () {
  const [current, setCurrent] = useState("mail");
  // Menu on the top
  const items = [
    {
      label: "Home",
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: "Mail",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Notion",
      key: "noti",
      icon: <MailOutlined />,
    },
    {
      label: "Account",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          key: "1",
          label: "Personal Information",
        },
        {
          key: "2",
          label: "Password reset",
        },
        {
          key: "3",
          label: "Logout",
        },
      ],
    },
  ];
  // Menu on the left
  const items2 = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Account Management",
      children: [
        {
          key: "1-1",
          label: "Role Management",
        },
        {
          key: "1-2",
          label: "User Management",
        },
      ],
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Room Management",
      childre: [
        {
          key: "2-1",
          label: "Room Type Management",
        },
        {
          key: "2-2",
          label: "Room Unit Management",
        },
        {
          key: "2-3",
          label: "Operational Statistics",
        },
      ],
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "Client Management",
    },
  ];
  // side layout collapsed status
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {collapsed ? "Wanjun" : "Hotel Managerment System"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items2}
        />
      </Sider>
      <Layout className="right">
        <Header className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Menu
            theme="dark"
            className="menu"
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content className="content">Content</Content>
      </Layout>
    </Layout>
  );
}
