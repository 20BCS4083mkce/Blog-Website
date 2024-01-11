import { useEffect, useState } from 'react';
import { List, Flex, Image, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPublicPost, setPostdetailsupdate } from "../redux/features/PublicPost/publicpostSlice";
import '../Style/LayoutSider.scss';
import { Layout } from 'antd';
import SearchBox from "./SearchBox";

const { Sider } = Layout;

const LayoutSider = () => {
    const dispatch = useDispatch();
    const publicpost = useSelector((state) => state.publicpost);
    const [hasMore, setHasMore] = useState(true);
    const [selectedId, setSelectedId] = useState(publicpost.id);
    useEffect(() => {
        dispatch(fetchPublicPost());
        if (publicpost.offsetdata.length === 0 || publicpost.offsetdata.length < 10) {
            setHasMore(false);
        }
    }, [publicpost.offset]);
    useEffect(()=>{
         setSelectedId(publicpost.id);
    })
    const fetchData = () => {
        dispatch(fetchPublicPost());
    };

    function handlePost(item) {
        console.log(item);
        dispatch(setPostdetailsupdate(item));
        setSelectedId(item.id);
    }

    const dataSource = Array.isArray(publicpost.post) ? publicpost.post : [];

    return (
        <Sider width={413} className='dashboard-sider'>
            <InfiniteScroll
                dataLength={dataSource.length}
                next={fetchData}
                hasMore={hasMore}
            >
                <Flex className='dashboard-sider-top'>
                    <div className='dashboard-sider-top-header'>Published blogs</div>
                    <SearchBox/>
                </Flex>
                <List
                    itemLayout="vertical"
                    dataSource={dataSource}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <Card onClick={() => handlePost(item)} className={`dashboard-sider-list-card ${item.id === selectedId ? 'selected-card' : ''}`} bordered={false}>
                                <Flex className='dashboard-sider-list'>
                                    <Image src={item.user.profile_url} preview={false} />
                                    <Flex>
                                        <div className='dashboard-sider-list-item-name'>{item.name}</div>
                                        <div className='dashboard-sider-list-item-user-detail'>{item.user.first_name} {item.user.last_name}, {moment(item.created_at).format('DD MMM YYYY')}</div>
                                    </Flex>
                                </Flex>
                            </Card>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </Sider>
    );
};

export default LayoutSider;
