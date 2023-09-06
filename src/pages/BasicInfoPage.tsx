// src/pages/BasicInfoPage.tsx
import React, { useState } from 'react';
import { Typography, Form, Input, Button, Select, Checkbox, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const { Title } = Typography;
const { Option } = Select;

const BasicInfoPage: React.FC = () => {

  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    setUserInfo(values); // <-- Update the global user info
    navigate('/image-comparison');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          rules={[{ required: false, message: 'Please input your age!' }]}
        >
          <Input type="number" placeholder="25" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: false, message: 'Please select your gender!' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Non Binary</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms.')),
            },
          ]}
        >
          <Checkbox>
          I have read and agree to the <a onClick={showModal} className="underline text-blue-500 cursor-pointer">terms</a>.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>


      <Modal title="Terms and Conditions" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="text-justify" okButtonProps={{ style: { color: '#000' } }}>
          <div className="space-y-2">
            <p>I agree to participate in the user interface experiment by the User Interfaces group.</p>
            <p>I have understood that the material and research data is gathered for scientific purposes only. The purpose and nature of the study have been explained to me in writing. I have sufficient information on the process of the study.</p>
            <p>I understand that my participation in the study is completely voluntary and that I have the right to discontinue my participation at any stage without any consequences.</p>
            <p>I give permission for my data to be recorded in the described manner.</p>
            <p>I understand that I can ask to take a break at any time during the study.</p>
            <p>It has been explained to me that a designated researcher will, at my request, provide me with additional details of the general principles of the study and its progress or of the results concerning myself.</p>
            <p>I understand that anonymity will be ensured by disguising my identity. I have been explained who are the different parties involved in the research that have access to my data. I understand the practices of storing, protecting, and using the data.</p>
            <p>I know that the collected data will not be presented to a third party without my written consent. I know that the research group may ask for a professional consultation on possible unexpected incidental findings without separate consent provided that the anonymity of the results has been ensured. Any type of commercial exploitation of the results is prohibited.</p>
            <p>I understand that a fully anonymized subset of the data may be released to other research groups for the purposes mentioned above, if I give permission to it.</p>

          </div>
        </Modal>

      </Form>
    </div>
  );
};

export default BasicInfoPage;
