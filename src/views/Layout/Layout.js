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
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Account Management",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Room Management",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Client Management",
            },
          ]}
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
