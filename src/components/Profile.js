import { Modal, Button, Dropdown, Form, Input, message, Upload, Flex,Avatar} from 'antd';
import React,{ useState,useEffect }  from "react";
import '../Style/Profile.scss'
import {VerticalAlignBottomOutlined,SyncOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, updateUser} from "../redux/features/authentication/validateSlice";
export default function Profile()
{

    let profile=useSelector((state)=>state.validate.profile);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [file, setFile] = useState('');
    useEffect(()=>{


    },[profile.last_name,profile.first_name,profile.profile_url])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);

    };

    const onupdateProfile = async () => {
        try {
            const values = await form.validateFields();
            await dispatch(updateUser(values));
            setIsModalOpen(false);
            setFile('')
            form.resetFields();
        } catch (error) {


            console.error('Validation failed:', error);
        }
    };

    const onlogoutUser = async (values) => {

        await dispatch(logoutUser(values));
        console.log('log');

    };

    const checkFile = (file) => {
        const isPNG = file.type === 'image/png'|| 'image/jpg'||'image/jpeg';
        if (!isPNG) {
            message.error('You can only upload PNG or JPG 0r JEPG files!');
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




    const items = [
        {
            key: '1',
            label: (
                <div  className='dropdown-item' onClick={showModal} >
                    <SyncOutlined className='icon' />
                    Profile

                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className='dropdown-item' onClick={onlogoutUser}>
                    <VerticalAlignBottomOutlined className='icon'  />Logout

                </div>
            ),
        },

    ];






        return(
        <>
        <Dropdown
            overlayClassName='custom-dropdown'
            menu={{
                items,
            }}
            placement="bottom"
            arrow={{
                pointAtCenter: true,
            }}

        >
           <Avatar src={profile.profile_url} shape='square'/>

        </Dropdown>

            <Modal title="Profile" open={isModalOpen}   onCancel={handleCancel}
                   footer={[
                       <Button  type="primary" onClick={onupdateProfile} htmlType="submit" className='modal-fotter-button' >
                           Submit
                       </Button>,

                       <Button key="back" onClick={handleCancel} className='modal-fotter-button'>
                           Cancel
                       </Button>,


                   ]}


            >
                <Form  layout="vertical" autoComplete="off"  onFinish={onupdateProfile}
                       form={form}
                       className="custom-form-item"
                       fields={[
                           {
                           name:'first_name',
                           value:profile.first_name,
                           },
                           {
                               name:'last_name',
                               value:profile.last_name,
                           }
                       ]}
                       requiredMark={false}
                >


                    <Form.Item

                        label="First Name*"
                        name='first_name'
                        rules={[
                            {
                                required:true,
                                message:"Enter the First Name"
                            }
                        ]}

                    >
                        <Input  className='modal-form-input'/>
                    </Form.Item>

                    <Form.Item
                        label="Last Name*"
                        name='last_name'
                        rules={[
                            {
                                required:true,
                                message:"Enter the Last Name"
                            }
                        ]}
                    >
                        <Input className='modal-form-input'  />
                    </Form.Item>
                    <Form.Item

                        label="Profile Image*"
                        name='image'
                        rules={[
                            {
                                required:true,
                                message:"upload image"
                            }
                        ]}
                    >

                        <Upload
                        customRequest={({ onSuccess }) => onSuccess('ok')} // A dummy request to bypass Ant Design's internal request logic
                        showUploadList={false}
                        beforeUpload={checkFile}
                        onChange={handleChange}

                        >
                        <Flex>
                        <Input  value={file}  className='modal-form-input' readOnly/>
                            <Button type='primary' className='modal-form-upload-button'>Choose Image</Button>
                        </Flex>
                    </Upload>

                    </Form.Item>




                </Form>
            </Modal>

        </>
    )
}