import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Result from './views/Result'
import './App.css'
// import './styles/Index.scss';
import Data from './shared/TestData.json'



function App() {

  const [questions, setQuestions] = useState<any>(null);


  // for axios call get questions endpoint
  useEffect(() => {
    setQuestions(Data.wordList)
  }, [])




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home questions={questions} />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App




