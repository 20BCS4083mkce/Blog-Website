import React from 'react';
import {Flex, Layout} from 'antd';
import LayoutSider from "./LayoutSider";
import '../Style/Dashboard.scss';
import SearchBox from "./SearchBox";
import LayoutContent from "./LayoutContent";

const { Content, Sider } = Layout;

const Dashboard = () => {
    return (
        <Layout className='dashboard-layout'>
            <div className='dashboard-layout-sider'>
                <LayoutSider  />
            </div>
            <Layout >
                <Content className='dashboard-layout-content'>
                      <LayoutContent/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
