import './components/css/App.css'
import PetList from './components/PetList';
import LoginInput from './components/LoginInput';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import HeaderBar from './components/HeaderBar';
import MobileNavbar from './components/MobileNavbar';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <MobileNavbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<><PetList /></>} />
            <Route path="/login" element={<LoginInput />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;