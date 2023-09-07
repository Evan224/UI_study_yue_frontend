import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import BasicInfoPage from './pages/BasicInfoPage';
import ImageComparisonPage from './pages/ImageComparisonPage';
import TutorialPage from './pages/TutorialPage';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={WelcomePage} />
        <Route path="/basic-info" Component={BasicInfoPage} />
        <Route path="/image-comparison" Component={ImageComparisonPage} />
        <Route path="/tutorial" Component={TutorialPage} />
      </Routes>
    </Router>
  );
};

export default App
