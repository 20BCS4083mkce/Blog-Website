import  { useState,useEffect } from 'react';
import { Flex ,Button, Checkbox, Form, Input,message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/authentication/validateSlice';
import { useNavigate,Link} from "react-router-dom";
import '../Style/login.scss'
const Login = () => {
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const errorMessage=useSelector((state)=>state.validate.errorMessage);
    const isvalid = useSelector((state) => state.validate.isValid);
    const navigate=useNavigate();
    const onFinish = async (values) => {
        setError(null);
        await dispatch(loginUser(values));

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
    }, [isvalid, errorMessage]);


    return (
        <Flex className='container'>
            <Flex  className='form-container'>

                <Form
                    form={form}

                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <h2  className='form-title'>Sign in to your account</h2>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type:"email",
                                message:'Please enter Valid mail!',

                            },
                            {
                                required: true,
                                message: 'Please enter your Email!',
                            },
                        ]}
                    >
                        <Input  placeholder="Email" className='form-input'/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Password!',
                            },
                        ]}

                    >
                        <Input
                            type="password"
                            placeholder="Password"
                            className='form-input'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox  className='custom-checkbox login-form-signup'>Save password</Checkbox>
                        </Form.Item>

                        <a className="form-forgot" href="www.mallow.com">
                            Forgot Password?
                        </a>

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            Sign in
                        </Button>
                    </Form.Item>
                    <Form.Item className='form-signup'>
                        Don't have an Account? <Link to='/register'>Sign up</Link>
                    </Form.Item>
                </Form>

            </Flex>

            <Flex className="image-container">


            </Flex>
        </Flex>

    );
};
export default Login;