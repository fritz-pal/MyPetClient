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
import ForumPage from './components/ForumPage';
import AddThread from './components/AddThread';
import ThreadView from './components/ThreadView';
import LoginPage from './components/LoginPage';
import AuthProvider from './components/AuthProvider';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/LabSWP24MyPet' : '/'}>
      <AuthProvider>
        <div className="App">
          <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
            <HeaderBar />
            <MobileNavbar />
          </NavbarContext.Provider>
          <div className="content">
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="newThread" element={<AddThread/>}/>
              <Route path="/newpet" element={<AddPet/>}/>
              <Route path="/forum" element={<ForumPage/>}/>
              <Route path="/thread/:id" element={<ThreadView/>}/>
              <Route path="/admin" element={<AdminAddSpecies/>}/>
              <Route path="/settings" element={<Settings/>}/>
              <Route path="*" element={<ErrorPage/>}/>
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;