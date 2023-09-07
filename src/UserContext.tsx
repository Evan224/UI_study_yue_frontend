// src/context/UserContext.tsx

import React, { createContext, useContext, useState,useEffect} from 'react';
import { notification } from 'antd';

interface UserState {
  userInfo: {
    name?: string;
    age?: number;
    gender?: string;
  };
  choices: number[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserState['userInfo']>>;
  setChoices: React.Dispatch<React.SetStateAction<number[]>>;
}

interface ChoiceProp{
  name:string;
  choiceName:string;
}

const UserContext = createContext<UserState | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserState['userInfo']>(() => {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  });
  
  const [choices, setChoices] = useState<ChoiceProp[]>(() => {
    return JSON.parse(localStorage.getItem('choices') || '[]');
  });

  const [imagePairs, setImagePairs] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem('imagePairs') || '[]');
});

useEffect(() => {
  // If imagePairs is already in localStorage, don't fetch again
  if (imagePairs.length > 0) return;

  // Fetch images from the backend
  fetch(import.meta.env.VITE_BACKEND_URL + '/api/images')
    .then(response => response.json())
    .then(data => {
        setImagePairs(data);
        localStorage.setItem('imagePairs', JSON.stringify(data)); // Store the fetched data in localStorage
    })
    .catch(error => console.error('Error fetching images:', error));
}, []);




const submitTheAnswer = () => {
  // Send data to the backend
  console.log(JSON.stringify({
    userInfo: userInfo,
    choices: choices
  }))
  fetch(import.meta.env.VITE_BACKEND_URL+'/api/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userInfo: userInfo,
      choices: choices
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Submission response:', data);
    notification.success({
      message: 'Submission Successful',
      description: 'Your answers have been successfully submitted.',
    });
  })
  .catch(error => {
    console.error('Error submitting data:', error);
    notification.error({
      message: 'Submission Failed',
      description: 'There was an error submitting your answers. Please try again.',
    });
  });
};

  
  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);
  
  useEffect(() => {
    localStorage.setItem('choices', JSON.stringify(choices));
  }, [choices]);

  return (
    <UserContext.Provider value={{ userInfo, choices, setUserInfo, setChoices,imagePairs,submitTheAnswer }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
