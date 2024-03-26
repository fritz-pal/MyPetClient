import viteLogo from '/vite.svg'
import './App.css'
import PetList from './components/PetList';
import LoginInput from './components/LoginInput';

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
    <>
      <Header />
      <div className="App">
        <img
          src={viteLogo}
          alt="Cat"
          className="logo"
        />
       <LoginInput />
        <div className="social-icons">
          <img
            src={viteLogo}
            alt="Twitter"
            className="logo"
          />
        </div>
        <p className="register-link">
          Noch keinen Account? Jetzt registrieren
        </p>
        <PetList />
      </div>
    </>
  );
}

export default App;