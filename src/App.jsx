import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API = "https://openlibrary.org/search/authors.json?q=suzanne%20collins";

function App() {
  const [progress, setProgress] = useState(0)
  const [author, setAuthor] = useState(undefined);

  /* 
    useEffect runs the callback function
    - on mounting the component
    - on updating the component
    - on unmounting the component
  
   question: when does useEffect get executed initially?
   answer: AFTER rendering the component */
  useEffect(() => {

    async function loadData() {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data)
      setAuthor(data)
    }

    loadData();

    return () => {
      /* clean up stuff */
    }

  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((previousProgress) => previousProgress + 10)
      } else {
        clearInterval(interval);
      }
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [progress])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>Fortschritt: {progress}%</div>
        <p>
          {/* .? optional operator/chaining */}
          Gefunden: {author?.numFound}
        </p>
        <ul>
          {author?.docs.map((work) => <li key={work.key}>{work.top_work}</li>)}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
