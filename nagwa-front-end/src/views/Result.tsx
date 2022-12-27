import React from 'react'
import ModalIcon from '../components/Exam/ModalIcon'

const Result = (props: any) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <ModalIcon />
      <h2 className='text-center text-lime-800 font-bold text-xl '>Hurray! You got it right</h2>
      <h2 className='text-center text-lime-800 font-bold text-xl '>Your score is: {props.score}</h2>
      <h2 className='text-center text-lime-800 font-bold text-xl '>Wrong answers are: </h2>
      {props.questions.map((item: any, key: number) => {
        if (item.answer !== item.pos) {
          return
        } else {
          return (
            <li>
              {item.word}
            </li>
          )
        }
      })}

    </div>
  )
}

export default Result