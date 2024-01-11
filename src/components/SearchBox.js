import React, { useState,useEffect } from 'react';
import { Input } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { fetchPost } from '../redux/features/Post/postSlice';
import {SearchOutlined} from "@ant-design/icons";
import '../Style/SearchBox.scss'
import {fetchPublicPost} from "../redux/features/PublicPost/publicpostSlice";


const SearchBox = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');


    useEffect(()=>{
        dispatch(fetchPublicPost(''));
    })
    const handleSearch = (value) => {
        setSearchValue(value);
        dispatch(fetchPost(value));
        dispatch(fetchPublicPost(value))
    };

    return (
        <Input
            prefix={<SearchOutlined className='Search-Box-icon' />}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className='Search-Box'
        />
    );
};

export default SearchBox;
