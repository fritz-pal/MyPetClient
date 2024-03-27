import './components/css/App.css'
import PetList from './components/PetList';
import LoginInput from './components/LoginInput';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import HeaderBar from './components/HeaderBar';
import MobileNavbar from './components/MobileNavbar';
import NavbarContext from './components/MenuContext';
import { useState } from 'react';
import AddPet from './components/AddPet';

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
            <Route path="/" element={<PetList/>}/>
            <Route path="/login" element={<LoginInput/>}/>
            <Route path="/newpet" element={<AddPet/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;