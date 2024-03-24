import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { useTranslation } from 'react-i18next'


function Header() {
  return (
    <div className="header">
      <h1>MyPet</h1>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [t, _] = useTranslation("test")
  return (
    <>
      <Header />
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>Vite + React</h1>
      <a target="_blank" href="https://bitbucket-student.it.hs-heilbronn.de/users/hstaudenra/repos/mypetclient/browse">Client Repo</a>
      <br /> 
      <a target="_blank" href="https://bitbucket-student.it.hs-heilbronn.de/users/nvogel1/repos/mypet/browse">Server Repo</a>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <h2>
        {t("test")}
      </h2>
    </>
  )
}

export default App
