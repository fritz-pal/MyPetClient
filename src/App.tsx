import viteLogo from '/vite.svg'
import './App.css'
import MyPetsModule from './HomeScreen';

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
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="login-button">Login</button>
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
        <MyPetsModule />
      </div>
    </>
  );
}

export default App;