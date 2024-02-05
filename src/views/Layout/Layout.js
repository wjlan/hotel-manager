// icon
import {
  HomeOutlined,
  NotificationOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import "./Layout.scss";
export default function () {
  const navigate = useNavigate()
  // initial menu icon
  const [current, setCurrent] = useState('home');
  // Menu on the top
  const items = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Mail",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Notion",
      key: "noti",
      icon: <NotificationOutlined/>,
    },
    {
      label: "Account",
      key: "mine",
      icon: <UserOutlined />,
      children: [
        {
          key: "my",
          label: "Personal Information",
        },
        {
          key: "pwd",
          label: "Password reset",
        },
        {
          key: "exit",
          label: "Exit",
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
      icon: <SettingOutlined />,
      label: "Client Management",
    },
  ];
  // onClickMenu function
  const onClickMenu = (e) => {
    setCurrent(e.key)
    switch(e.key){
      // if the submenu is exit, exit the system
      case 'exit':
        sessionStorage.clear()
        localStorage.clear()
        navigate('/')
        break
    }
  }
  // side layout collapsed status
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {collapsed ? "Wanjun" : "Hotel Managerment System"}
        </div>
        <Menu
          onclick={onClickMenu}
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
            onclick={onClickMenu}
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