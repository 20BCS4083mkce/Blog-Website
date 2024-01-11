import {Flex, Layout} from "antd";
import '../Style/Post.scss'
import SearchBox from "./SearchBox";
import PostTable from "./PostTable";
import PostCreate from "./PostCreate";

export default function Post()
{


    return(
        <Layout className='Post-layout'>
            <Flex className='Post-layout-header'>
                <div className='Post-layout-header-left'>Posts</div>
                <Flex className='Post-layout-header-right'>
                    <SearchBox/>
                    <PostCreate/>
                </Flex>
            </Flex>
            <Layout>
                <PostTable/>
            </Layout>
        </Layout>
    )
}