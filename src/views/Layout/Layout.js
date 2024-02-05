import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;
import "./Layout.scss";
export default function () {
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
        </Header>
        <Content className="content">Content</Content>
      </Layout>
    </Layout>
  );
}