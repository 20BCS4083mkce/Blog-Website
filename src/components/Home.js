import React, {useEffect, useState} from 'react';
import { Image, Layout, Flex } from 'antd';
import Logo from '../assets/Logo.svg';
import '../Style/Home.scss';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Post from './Post';
import {useSelector} from "react-redux";
import PostPreview from "./PostPreview";
const { Header } = Layout;

const Home = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };


    const previewPage = useSelector((state) => state.post.previewPage);
    useEffect(() => {

    }, [previewPage]);


    if(previewPage){
        return (
            <Layout className='Preview-page'>
                <PostPreview/>
            </Layout>
        )
    }


    return (
        <Layout className='layout'>
            <Header className='layout-header'>
                <div className='layout-header-item'>
                    <Flex className='layout-header-item-left'>
                        <Image src={Logo} preview={false} />
                        <Flex className='layout-header-item-left-menu'>
                            <div onClick={() => handleMenuClick('dashboard')} className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}>
                                Dashboard
                            </div>
                            <div onClick={() => handleMenuClick('posts')} className={`menu-item ${activeMenu === 'posts' ? 'active' : ''}`}>
                                Posts
                            </div>
                        </Flex>
                    </Flex>

                    <Flex className='layout-header-item-right'>
                        <Profile />
                    </Flex>
                </div>
            </Header>
            <Layout className='layout-layout-content'>
                {activeMenu === 'posts' ? <Post /> : <Dashboard />}
            </Layout>
        </Layout>
    );
};

export default Home;
