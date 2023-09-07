import React from 'react';
import { Typography, Button, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const TutorialPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-4">
      <Card className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
        <Title level={1} className="text-center text-blue-600">Study Tutorial</Title>
        <Paragraph className="text-lg leading-7 text-left">
          Welcome to the user study tutorial! In this study, you will be presented with pairs of user interfaces. Your task is to select the interface that you prefer based on your personal criteria. This could include factors such as design, layout, aesthetics, or any other characteristics that influence your preference. Specifically, you are to evaluate which image looks better with the introduction of a new layout block in the UI design.
        </Paragraph>
        <Paragraph strong className="mt-4 text-xl text-left">
          Here is a breakdown of the tasks you'll undertake during this study:
        </Paragraph>
        <ol className="list-decimal list-inside space-y-2 pl-5 text-lg text-left">
          <li>
            <strong>Basic Information:</strong> Initially, you will provide some fundamental information about yourself.
          </li>
          <li>
            <strong>Image Comparison:</strong> Following that, you will view pairs of images representing different user interfaces. Your job is to indicate your preference by choosing either the left or the right image, especially considering which image incorporates the new layout block more effectively. If both images are equally appealing, you can opt to select "They are equally good".
          </li>
          <li>
            <strong>Submission:</strong> After reviewing all the image pairs, you will submit your choices.
          </li>
        </ol>
        <Paragraph className="mb-4 text-lg text-left">
          Please remember, there are no right or wrong answers in this study; we are purely interested in your personal preference. Your insights are invaluable to us.
        </Paragraph>
        <Link to="/basic-info">
          <Button type="primary" size="large" className="w-full text-xl text-blue-300">
            Start Study
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default TutorialPage;
