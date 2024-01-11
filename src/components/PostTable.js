import React, {useEffect} from 'react';
import {Table, Skeleton, Button,Flex} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import '../Style/PostTable.scss'
import {deletePost, fetchPost, previewPost, publishPost} from "../redux/features/Post/postSlice";



const PostTable = () => {
    const posts = useSelector((state) => state.post);
    const dispatch=useDispatch();
    const handlePostPreview=(item)=>{
        dispatch(previewPost(item));
    }
    const handleDelete=(item)=>
    {
        const itemId = item.id;
        dispatch(deletePost(itemId));

    }
    const handleUnpublish=(item)=>
    {
        console.log(item);
        dispatch(publishPost(item));

    }

    const page=useSelector((state) => state.post.page);
    useEffect(() => {

        dispatch(fetchPost(''));

    }, [page]);



    const columns = [

        {
            title: 'Post Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span className="post-name" onClick={() => handlePostPreview(record)}>
        {text}
      </span>
            ),
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => moment(created_at).format('DD/MM/YYYY, h:mm a'),
        },
        {
            title: 'Updated at',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (updated_at) => moment(updated_at).format('DD/MM/YYYY, h:mm a'),

        },
        {
            title: 'Action',
            dataIndex: 'is_published',
            key: 'is_published',
            render: (isPublished,record) => (isPublished ?
                <Flex className='action-btn'>
                    <Button type='primary' onClick={() => handleUnpublish(record)}>Unpublish</Button>
                    <Button className='action-btn-delete' onClick={() => handleDelete(record)}>Delete</Button>
                </Flex>
                : ''),
        },
    ];




    if (posts.loading) {
        return (
           <Skeleton className='skeleton' paragraph={{rows:10}} title={false} active/>


        );
    }

    const dataSource = Array.isArray(posts.data.data) ? posts.data.data : [];
    return <Table dataSource={dataSource} columns={columns} pagination={{ position: ["bottomCenter"] }}/>;
};

export default PostTable;
