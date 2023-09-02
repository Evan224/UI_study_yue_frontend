// src/pages/ImageComparisonPage.tsx

import React, { useState } from 'react';
import { Button } from 'antd';

import { useUser } from '../UserContext'; 

// const imagePairs = [
//   { id: 1, left: 'https://picsum.photos/200/300?random=1', right: 'https://picsum.photos/200/300?random=2',name:'image1',grid:'left' },
//   { id: 2, left: 'https://picsum.photos/200/300?random=3', right: 'https://picsum.photos/200/300?random=4',name:'image2',grid:'right' },
// ];

const ImageComparisonPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setChoices,imagePairs,submitTheAnswer } = useUser(); // <-- Use the hook

  const handleChoice = (choiceIndex: number) => {
    const choiceName = choiceIndex === 0 ? 'left' : 'right';
    const choiceData = {
      name: imagePairs[currentIndex].name,
      choiceName: choiceName,
      grid: imagePairs[currentIndex].grid
    };
  
    setChoices((prevChoices) => {
      // Check if a choice for the current image pair already exists
      const existingChoiceIndex = prevChoices.findIndex(
        (choice) => choice.name === choiceData.name
      );
  
      // If it exists, update the choice
      if (existingChoiceIndex !== -1) {
        const updatedChoices = [...prevChoices];
        updatedChoices[existingChoiceIndex] = choiceData;
        return updatedChoices;
      }
  
      // If it doesn't exist, add the new choice
      return [...prevChoices, choiceData];
    });
  
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setChoices((prevChoices) => prevChoices.slice(0, -1));
    }
  };

  // const handleSubmit = () => {
  //   console.log('User choices:', choices);
  //   console.log('User info:', userInfo); 
  // };

  if (currentIndex >= imagePairs.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Thank you for participating!</h1>
        <Button type="primary" onClick={submitTheAnswer}>
          Submit Results
        </Button>
      </div>
    );
  }

  const currentPair = imagePairs[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Choose Your Preferred Image</h1>
      <div className="flex space-x-4">
        <img
          src={currentPair.left}
          alt={`Image ${currentIndex + 1}A`}
          className="cursor-pointer w-72 h-72 object-cover" // <-- Tailwind classes here
          onClick={() => handleChoice(0)}
        />
        <img
          src={currentPair.right}
          alt={`Image ${currentIndex + 1}B`}
          className="cursor-pointer w-72 h-72 object-cover" // <-- Tailwind classes here
          onClick={() => handleChoice(1)}
        />
      </div>
      <div className="flex space-x-4 mt-4">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button onClick={() => handleChoice(-1)}>Skip</Button>
      </div>
    </div>
);
};

export default ImageComparisonPage;
