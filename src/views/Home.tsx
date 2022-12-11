import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet} from "react-router-dom";
import  MainMenu   from "@/components/MainMenu";

const { Header, Content, Footer, Sider } = Layout;


const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const navigatTO =useNavigate();



  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左邊側邊攔 sider */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
       <MainMenu/>
      </Sider>
      {/* 右邊內容Layout */}
      <Layout className="site-layout">
        {/* 右邊頭部 */}
        <Header  className="site-layout-background" style={{ paddingLeft: '16px' }} >
          {/* 麵包屑 */}
        <Breadcrumb style={{ lineHeight:'64px' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        {/* 右邊內容 -白色框框區塊*/}
        <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
           {/* 之後窗口都可以放在這邊 */}
            <Outlet/>
        </Content>
        {/* 右邊底部 */}
        <Footer style={{ textAlign: 'center',padding:0,lineHeight:'48px' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default View;