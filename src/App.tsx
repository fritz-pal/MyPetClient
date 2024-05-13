import './components/css/App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import HeaderBar from './components/HeaderBar';
import MobileNavbar from './components/MobileNavbar';
import NavbarContext from './context/MenuContext';
import { useState } from 'react';
import AddPet from './components/AddPet';
import Homepage from './components/Homepage';
import AdminAddSpecies from './components/AdminAddSpecies';
import Settings from './components/Settings';
import { Card } from './components/Card';
import ReminderPage from './components/ReminderPage'
import ReminderHomePage from './components/ReminderHomePage';
import ForumPage from './components/ForumPage';
import AddThread from './components/AddThread';
import ThreadView from './components/ThreadView';
import AuthProvider from './components/AuthProvider';
import UserContextProvider from './context/UserContext';
import "./components/css/aria.css"
import UserView from './components/UserView';
import PetProfile from './components/PetProfile';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/LabSWP24MyPet' : '/'}>
      <AuthProvider>
        <UserContextProvider>
          <div className="App">
            <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
              <HeaderBar />
              <MobileNavbar />
            </NavbarContext.Provider>
            <div className="content">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="newThread" element={<AddThread />} />
                <Route path="/newpet" element={<AddPet />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/thread/:id" element={<ThreadView />} />
                <Route path="/admin" element={<AdminAddSpecies />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/card" element={<Card />} />
                <Route path="/reminders" element={<ReminderHomePage />} />
                <Route path="/newreminder" element={<ReminderPage />} />
                <Route path="/user/:id" element={<UserView />} />
                <Route path="/pet/:id" element={<PetProfile />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </UserContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;