import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isToggled, setIsToggled] = useState(false);
  const handleClick = () => {
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{count}</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count - 1)}>
       -
        </button>
     
     <button onClick={() => setCount(0)}>
          Reset
        </button>

        <button onClick={() => setCount((count) => count + 1)}>
    +
      </button>
     
      
      
      {/* Daalgawar 3 useState bolon Conditional rendering ashiglah */}
       
        <button onClick={handleClick}>
          {isToggled ? " 🙈 Hide Secret" : "🙈 Reveal Secret"}
           </button>
{isToggled && <p> ✨ React is awesome! ✨ </p>}


        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
