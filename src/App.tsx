import './components/css/App.css'
import LoginInput from './components/LoginInput';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import HeaderBar from './components/HeaderBar';
import MobileNavbar from './components/MobileNavbar';
import NavbarContext from './context/MenuContext';
import { useEffect, useState } from 'react';
import AddPet from './components/AddPet';
import Homepage from './components/Homepage';
import AdminAddSpecies from './components/AdminAddSpecies';
import Settings from './components/Settings';
import { Card } from './components/Card';
import ForumPage from './components/ForumPage';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log("App mounted!");
  }, []);
  return (
    <Router>
      <div className="App">
        <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
          <HeaderBar />
          <MobileNavbar />
        </NavbarContext.Provider>
        <div className="content">
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<LoginInput/>}/>
            <Route path="/newpet" element={<AddPet/>}/>
            <Route path="/forum" element={<ForumPage/>}/>
            <Route path="/admin" element={<AdminAddSpecies/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/card" element={<Card/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;