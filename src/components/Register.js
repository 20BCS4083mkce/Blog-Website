import  {useEffect, useState} from 'react';
import {Flex, Button, Form, Input, message} from 'antd';
import '../Style/login.scss'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from "../redux/features/authentication/validateSlice";

export default function Register() {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const errorMessage=useSelector((state)=>state.validate.errorMessage);
    const isvalid = useSelector((state) => state.validate.isValid);
    const navigate=useNavigate();
    const onFinish = async (values) => {

        setError(null);
        await dispatch(registerUser(values));


    };

    useEffect(() => {
        if (isvalid) {
            navigate('/');
        }
        if (errorMessage) {
            setError(errorMessage);
            message.error(errorMessage, 2);
            setTimeout(() => {
                setError(null);
                form.resetFields();
            }, 2000);

        }
    }, [isvalid, errorMessage,navigate]);


    return (
        <Flex className='container'>
            <Flex className='form-container'>

                <Form
                    name="form"
                    form={form}
                    className="register-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <h2 className='form-title'>Sign up to your account</h2>
                    </Form.Item>

                    <Flex className='register-username'>
                        <Form.Item
                            name='first_name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your first name'
                                }
                            ]}
                        >
                            <Input placeholder='First Name' className='register-user-firstname'/>
                        </Form.Item>
                        <Form.Item
                            name='last_name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your last name'
                                }
                            ]}
                        >
                            <Input placeholder='Last Name' className='register-user-lastname'/>
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: 'Please enter Valid mail!',

                            },
                            {
                                required: true,
                                message: 'Please enter your Email!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" className='form-input'/>
                    </Form.Item>


                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Password!',
                            },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters long!',
                            },
                            {
                                pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: 'Password must contain letters, numbers, and special characters!',
                            },
                        ]}


                    >
                        <Input
                            className='form-input'
                            type="password"
                            placeholder="Password"

                        />
                    </Form.Item>

                    <Form.Item
                        name="password_confirmation"
                        dependencies={['password']}

                        rules={[
                            {
                                required: true,
                                message: 'Please enter your confirm Password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}

                    >
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            className='form-input'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            Sign up
                        </Button>
                    </Form.Item>
                    <Form.Item className='form-signup'>
                        Already have an Account? <Link to='/login'>Sign in</Link>
                    </Form.Item>
                </Form>

            </Flex>

            <Flex className="image-container">


            </Flex>
        </Flex>
    )
}