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
import PrivateChat from './components/PrivateChat';
import WebsocketClient from './components/WebsocketClient';
import ChatList from './components/ChatList';
import NotificationContainer from './components/NotificationContainer';
import HelpContextProvider from './components/HelpContextProvider';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/LabSWP24MyPet' : '/'}>
      <WebsocketClient>
        <AuthProvider>
          <UserContextProvider>
            <HelpContextProvider>
              <div className="App">
                <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
                  <HeaderBar />
                  <MobileNavbar />
                </NavbarContext.Provider>
                <NotificationContainer />
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
                    <Route path="/chat/:chatId" element={<PrivateChat />} />
                    <Route path="/chat/user/:userId" element={<PrivateChat />} />
                    <Route path="/chat" element={<ChatList />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </div>
              </div>
            </HelpContextProvider>
          </UserContextProvider>
        </AuthProvider>
      </WebsocketClient>
    </Router>
  );
}

export default App;