// src/pages/WelcomePage.tsx

import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const WelcomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <Title>Welcome to the User Study</Title>
      <Paragraph>
        This platform is designed to gather user preferences on image pairs. Your feedback is invaluable to us.
      </Paragraph>
      <Link to="/basic-info">
      <Button type="primary" size="large">
        Start Study
      </Button>
      </Link>
    </div>
  );
};

export default WelcomePage;
