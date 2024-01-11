import {Button, Modal, Input, Upload, Form, Flex, message} from "antd";
import '../Style/PostCreate.scss';
import '../Style/Profile.scss'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../redux/features/Post/postSlice";
export default function PostCreate()
{
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm();
   const [file, setFile] = useState('');
   const dispatch = useDispatch();
   const previewPage = useSelector((state) => state.post.previewPage);
   const preview = useSelector((state) => state.post.preview);

    const showModal = () => {
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);

   };

   const onupdateProfile = async () => {
      try {
         const values = await form.validateFields();
         if(previewPage)
         {
             await dispatch(updatePost(values))
         }
         else {
             await dispatch(createPost(values))
         }
         setIsModalOpen(false);
         setFile('')
         form.resetFields();
      }
      catch (error) {
          console.error('Validation failed:', error);
      }
   };


   const checkFile = (file) => {
      const isPNG = file.type === 'image/png'|| 'image/jpg'||'image/jpeg';
      const maxSizeInBytes = 2 * 1024 * 1024
      if (!isPNG ) {
         message.error('You can only upload PNG or JPG 0r JEPG files!');
      }
      if (file.size > maxSizeInBytes) {
         message.error('File size exceeds the maximum allowed size 2 MB!');
         return false;
      }
      return isPNG;
   };

   const handleChange = (info) => {
      if (info.file.status === 'done') {
         setFile(info.file.name);
         message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
         message.error(`${info.file.name} file upload failed.`);
      }
   };
   if(previewPage)
   {
       return(
           <>
               <Button type={"primary"}  onClick={showModal}>Edit</Button>
               <Modal title="Title" open={isModalOpen}   onCancel={handleCancel}
                      footer={[
                          <Button  type="primary" onClick={onupdateProfile} htmlType="submit" className='modal-fotter-button' >
                              Submit
                          </Button>,

                          <Button key="back" onClick={handleCancel} className='modal-fotter-button'>
                              Cancel
                          </Button>,


                      ]}


               >
                   <Form  layout="vertical" autoComplete="off"
                          onFinish={onupdateProfile}
                          form={form}
                          fields={[
                              {
                                  name:'name',
                                  value:preview.name,
                              },
                              {
                                  name:'content',
                                  value:preview.content,
                              }
                          ]}
                          className="custom-form-item"
                   >


                       <Form.Item

                           label="Blog Title"
                           name='name'
                           rules={[
                               {
                                   required:true,
                                   message:"Enter the Blog Title"
                               }
                           ]}

                       >
                           <Input  className='modal-form-input'/>
                       </Form.Item>


                       <Form.Item

                           label="Cover Image"
                           name='image'
                           rules={[
                               {
                                   required:true,
                                   message:"upload image"
                               }
                           ]}
                       >

                           <Upload
                               customRequest={({ onSuccess }) => onSuccess('ok')}
                               showUploadList={false}
                               beforeUpload={checkFile}
                               onChange={handleChange}

                           >
                               <Flex>
                                   <Input    className='modal-form-input' readOnly/>
                                   <Button type='primary' className='modal-form-upload-button'>Choose Image</Button>
                               </Flex>
                           </Upload>

                       </Form.Item>

                       <Form.Item

                           label="Content"
                           name='content'
                           rules={[
                               {
                                   required:true,
                                   message:"Enter the Content"
                               }
                           ]}
                       >
                           <Input className='modal-form-input ' />
                       </Form.Item>





                   </Form>
               </Modal>
           </>
       )
   }
   return(
       <>
          <Button type={"primary"} className='create-btn' onClick={showModal}>Create</Button>

          <Modal title="Title" open={isModalOpen}   onCancel={handleCancel}
                 footer={[
                    <Button  type="primary" onClick={onupdateProfile} htmlType="submit" className='modal-fotter-button' >
                       Submit
                    </Button>,

                    <Button key="back" onClick={handleCancel} className='modal-fotter-button'>
                       Cancel
                    </Button>,


                 ]}


          >
             <Form  layout="vertical" autoComplete="off"  onFinish={onupdateProfile}  form={form} className="custom-form-item">


                <Form.Item

                    label="Blog Title"
                    name='name'
                    rules={[
                       {
                          required:true,
                          message:"Enter the Blog Title"
                       }
                    ]}

                >
                   <Input  className='modal-form-input'/>
                </Form.Item>


                <Form.Item

                    label="Cover Image"
                    name='image'
                    rules={[
                       {
                          required:true,
                          message:"upload image"
                       }
                    ]}
                >

                   <Upload
                       customRequest={({ onSuccess }) => onSuccess('ok')}
                       showUploadList={false}
                       beforeUpload={checkFile}
                       onChange={handleChange}

                   >
                      <Flex>
                         <Input    className='modal-form-input' readOnly/>
                         <Button type='primary' className='modal-form-upload-button'>Choose Image</Button>
                      </Flex>
                   </Upload>

                </Form.Item>

                <Form.Item

                    label="Content"
                    name='content'
                    rules={[
                       {
                          required:true,
                          message:"Enter the Content"
                       }
                    ]}
                >
                   <Input className='modal-form-input ' />
                </Form.Item>





             </Form>
          </Modal>
       </>
   )
}