import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className ="App">
      <header className="App-header">
        <h1>Welcome to my React App!</h1>
        <p>
          Name: Shannan Cate S. Angeles<br />
          Email: shancate7@gmail.com<br />
        </p>
      </header>
     </div>
  );
}

export default App
