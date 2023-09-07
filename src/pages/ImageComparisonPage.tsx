// src/pages/ImageComparisonPage.tsx
import React, { useState } from 'react';
import { Button, Image, Progress, Tooltip } from 'antd';
import Joyride, { STATUS, Step } from 'react-joyride';

import { useUser } from '../UserContext'; 


const ImageComparisonPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [runTutorial, setRunTutorial] = useState(() => {
    const hasRunTutorial = localStorage.getItem('hasRunTutorial');
    return hasRunTutorial === null;
  });

  const { setChoices,imagePairs,submitTheAnswer,choices } = useUser(); 
  
  const steps: Step[] = [
    {
      target: '.image-comparison-h1',
      content: (
        <>
          <strong>Step 1: Choose Your Preferred Image</strong>
          <p>In this step, you will be presented with pairs of images. Your task is to choose the image you prefer from each pair. You can click on the image directly to make your selection.</p>
        </>
      ),
    },
    {
      target: '.image-comparison-flex',
      content: 'Here you can view and compare two different images.',
    },
    {
      target: '.image-comparison-buttons',
      content: 'These are the buttons to navigate between images or mark them as similar.',
    },
    {
      target: '.submit-current-results-button',
      content: 'By clicking this button, you can submit the results of your current session.',
    },
    {
      target: '.image-comparison-progress',
      content: 'This progress bar shows you how far along you are in the study.',
    }
  ];

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

  const handleSimilarChoice = () => {
    const choiceData = {
      name: imagePairs[currentIndex].name,
      choiceName: 'similar',
      grid: imagePairs[currentIndex].grid
    };

    setChoices((prevChoices) => {
      const existingChoiceIndex = prevChoices.findIndex(
        (choice) => choice.name === choiceData.name
      );

      if (existingChoiceIndex !== -1) {
        const updatedChoices = [...prevChoices];
        updatedChoices[existingChoiceIndex] = choiceData;
        return updatedChoices;
      }

      return [...prevChoices, choiceData];
    });

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
  
      setChoices((prevChoices) => {
        const existingChoiceIndex = prevChoices.findIndex(
          (choice) => choice.name === imagePairs[currentIndex].name
        );
  
        if (existingChoiceIndex !== -1) {
          const updatedChoices = [...prevChoices];
          updatedChoices.splice(existingChoiceIndex, 1);
          return updatedChoices;
        }
  
        return prevChoices;
      });
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
        <Button type="primary" onClick={submitTheAnswer} className='text-black'>
          Submit Results
        </Button>
      </div>
    );
  }

  const currentPair = imagePairs[currentIndex];

  return (
    <>      
      <Joyride
      steps={steps}
      run={runTutorial}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={(data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as STATUS)) {
          setRunTutorial(false);
          localStorage.setItem('hasRunTutorial', 'true');
        }
      }}
      />
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="image-comparison-h1">Choose Your Preferred Image</h1>
      <div className="flex space-x-4 image-comparison-flex">
        <Image
          src={currentPair.left}
          alt={`Image ${currentIndex + 1}A`}
          className="cursor-pointer border-2 border-blue-500 shadow-lg" // Added border and shadow
          width={144}
          height={288}
          onClick={() => handleChoice(0)}
          preview={false}
        />
        <Image
          src={currentPair.right}
          alt={`Image ${currentIndex + 1}B`}
          className="cursor-pointer border-2 border-blue-500 shadow-lg" // Added border and shadow
          width={144}
          height={288}
          onClick={() => handleChoice(1)}
          preview={false}
        />
      </div>
      <div className="flex space-x-4 mt-4 image-comparison-buttons">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}>Skip</Button>
        <Button onClick={handleSimilarChoice}>They are equally good</Button> 
      </div>
      <Progress
        className="mt-4"
        percent={(currentIndex / imagePairs.length) * 100}
        showInfo={false}
      />
    <div className="flex mt-4 flex-wrap image-comparison-progress">
      {imagePairs.map((_, index) => (
        <Tooltip title={`Image Pair ${index + 1}`} key={index} className=''>
          <div
            className={`w-4 h-4 m-1 cursor-pointer text-xs flex items-center justify-center 
              ${choices.some(choice => choice.name === _.name) ? 'bg-blue-500 text-white' : 'bg-gray-300'} 
              ${index === currentIndex ? 'border-2 border-black' : ''}`} // Added condition for black border
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </div>
        </Tooltip>
      ))}
    </div>

      <Button className="mt-4 submit-current-results-button" onClick={submitTheAnswer}>
        Submit Current Results
      </Button>
    </div>
    </>
  );
};


export default ImageComparisonPage;
