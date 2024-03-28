import './components/css/App.css'
import LoginInput from './components/LoginInput';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import HeaderBar from './components/HeaderBar';
import MobileNavbar from './components/MobileNavbar';
import NavbarContext from './context/MenuContext';
import { useState } from 'react';
import AddPet from './components/AddPet';
import Homepage from './components/Homepage';
import AdminAddSpecies from './components/AdminAddSpecies';

function App() {
  const [isOpen, setIsOpen] = useState(false);
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
            <Route path="/admin" element={<AdminAddSpecies/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;