import './App.css'
import PetList from './components/PetList';
import LoginInput from './components/LoginInput';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import ErrorPage from './components/ErrorPage';

function Header() {
  return (
    <header className="App-header">
      <div className="menu-icon">
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
      <h1>Login</h1>
    </header>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<PetList/>}/>
            <Route path="/login"element={<LoginInput/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;