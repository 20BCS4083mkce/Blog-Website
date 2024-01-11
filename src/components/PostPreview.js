import {Button, Flex, Image, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import '../Style/PostPreview.scss';
import {deletePost, fetchPost, previewPostFailure, publishPost} from "../redux/features/Post/postSlice";
import PostCreate from "./PostCreate";

const PostPreview=()=>{

    const preview = useSelector((state) => state.post.preview);
    const dispatch=useDispatch();
    const handleBack=()=>
    {
        dispatch(previewPostFailure());

    }
    const handleDelete=()=>
    {
        const itemId = preview.id;
        dispatch(deletePost(itemId));

    }
    const handlePublish=()=>
    {

        dispatch(publishPost(preview));

    }

    return(
        <Layout className='Preview-layout'>
          <div className='Preview-Card'>
              <Flex className='Preview-Card-btn'>
                  <Button className='Preview-Card-btn-left-back' onClick={handleBack}>{"\u003C"} Back</Button>
                  <Flex className='Preview-Card-btn-right'>
                      <Button className='Preview-Card-btn-right-delete' onClick={handleDelete} >Delete</Button>
                      <PostCreate/>
                      {!preview.is_published && (
                          <Button
                              className='Preview-Card-btn-right-publish'
                              type='primary'
                              onClick={handlePublish}
                          >
                              Publish
                          </Button>
                      )}
                  </Flex>
              </Flex>
              <Flex className='Preview-Card-content'>
                  <Image src={preview.image_url} preview={false} className='Preview-Card-content-image'/>
                  <div>
                      <div className='Preview-Card-title'>{preview.name}</div>
                      <div className='Preview-Card-content'>{preview.content}</div>
                  </div>
              </Flex>
          </div>
        </Layout>
    )
}

export default PostPreview;