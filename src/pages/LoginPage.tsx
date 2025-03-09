import React from 'react';
import { Form, Input, Typography } from 'antd';
import Plane from '../assets/planeflat.jpg';
import StandardButton from '../components/custom/StandardButton';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    console.log('Received values of form: ', values);
    if (values.username === 'admin' && values.password === 'admin') {
      alert('Login Successful');
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('orders')
    } else {
      alert('Login Failed');
    }
  };

  return (
    <div  className='flex flex-col items-center justify-center h-screen w-screen '>
    <Form
      name="login"
      initialValues={{ remember: true }}
      size='large'
      style={{padding: '1.5rem'}}
      className='w-1/3 bg-white p-16 rounded-lg drop-shadow-md'
      onFinish={onFinish}
    >
      <Form.Item>
        <img src={Plane} alt="Plane" className='w-48  mx-auto mb-8'/>
      </Form.Item>
  
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input //prefix={<UserOutlined />}
         placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input //prefix={<LockOutlined />} 
        type="password" placeholder="Password" />
      </Form.Item>
      

      <Form.Item >
      <StandardButton 
        name='Log in' 
        type='submit'
        customStyles='mt-4 w-full text-center bg-green-500 hover:bg-green-700 text-white' 
      
      />
        
      </Form.Item>
      <Form.Item>
       <Typography className='text-center font-semibold' >Continue with Google</Typography>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginPage;