import {Flex, Image, Avatar, Skeleton} from 'antd';
import '../Style/LayoutContent.scss'
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {setPostdetails} from "../redux/features/PublicPost/publicpostSlice";
import moment from "moment/moment";



const LayoutContent=()=>
{
    const dispatch = useDispatch();
    const publicpost = useSelector((state) => state.publicpost);
    useEffect(()=>{
        dispatch(setPostdetails())
        },[publicpost.id]);

    if(publicpost.id===null)
    {
       return(
           <Skeleton/>
       )
    }
    return(

        <div
            className='Card'

        >
            <Flex className='Card-header'>
                <Avatar src={publicpost.user_detail.user.profile_url} shape='square' className='Card-header-Avatar-image'/>
                <Flex className='Card-header-detail'>
                    <div className='Card-header-detail-name'>{publicpost.user_detail.user.first_name} {publicpost.user_detail.user.last_name}</div>
                    <div className='Card-header-detail-date'>{moment(publicpost.user_detail.created_at).format('DD MMM YYYY')}</div>
                </Flex>
            </Flex>
            <Flex className='Card-content'>
                 <Image src={publicpost.content.image_url} preview={false}/>
                <div className='Card-content-title'>{publicpost.content.name}</div>
                <div className='Card-content-para'>{publicpost.content.content}</div>
            </Flex>
        </div>
    );
}

export default LayoutContent;