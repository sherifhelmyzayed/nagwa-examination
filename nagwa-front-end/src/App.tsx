import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, redirect, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import Exam from './views/Exam'
import Result from './views/Result'
import './App.css'
// import './styles/Index.scss';
import Data from './shared/TestData.json'



function App() {

  const [questions, setQuestions] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [refresh, setRefresh] = useState<any>(false);


  // for axios call get questions endpoint
  useEffect(() => {
    axios.get(`http://localhost:4000/word`)
    .then(res => {
      setQuestions(res.data);
    })
  }, [refresh])





  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Exam
          questions={questions}
          setQuestions={setQuestions}
          setScore={setScore}
        />} />
        <Route path="/result" element={<Result
          score={score}
          questions={questions}
          scoresList={Data.scoresList}
          refresh={refresh}
          setRefresh={setRefresh}
        />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App




