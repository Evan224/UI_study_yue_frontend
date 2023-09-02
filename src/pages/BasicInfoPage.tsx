// src/pages/BasicInfoPage.tsx

import React from 'react';
import { Typography, Form, Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const { Title } = Typography;
const { Option } = Select;

const BasicInfoPage: React.FC = () => {

  const navigate = useNavigate();
  const { setUserInfo } = useUser();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    setUserInfo(values); // <-- Update the global user info
    navigate('/image-comparison');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300 p-4">
      <Title level={2}>Basic Information</Title>
      <Form
        name="basic_info"
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input type="number" placeholder="25" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BasicInfoPage;
