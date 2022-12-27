import { useEffect, useState } from 'react'
import ModalIcon from '../components/Exam/ModalIcon';

const Result = (props: any) => {
  const [rank, setRank] = useState<number | null>(null)
  useEffect(() => {
    setRank(calculateRank())
  }, []);


  const calculateRank = () => {
    const scoreList = props.scoresList
    let counter = 0;
    scoreList.map((item: number) => {
      if (item < (props.score / props.questions.length * 100)) {
        counter++
      }
    })
    return (Math.round(counter / scoreList.length * 100));
  }

  return (
    <div className='w-screen h-screen flex justify-start items-center flex-col bg-gray-300 py-20'>
      <ModalIcon />
      <div className="rounded bg-white px-20 py-5">
        <h2 className='text-center text-lime-800 font-bold text-xl '>Your score is: {props.score}</h2>
      </div>

      <div className="grid grid-cols-3 gap-10 w-screen">
        <div className="span-col-1">
          <div className="rounded bg-white px-20 py-5">
            <h2 className='text-center text-lime-800 font-bold text-xl '>Wrong answers are: </h2>
            {props.questions.map((item: any, key: number) => {

              if (item.answer !== item.pos) {
                console.log(item.word);
                return (
                  <li className='text-red-800'>
                    {item.word}
                  </li>
                )
              }
            })}
          </div>
        </div>
        <div className="span-col-2">
          <div className="rounded bg-white px-20 py-5">
            <h2 className='text-center font-bold text-xl text-red-600'>Your Rank among 30 competitors:
            </h2>
            <h2 className='text-center font-bold text-2xl text-red-600'>
              {rank}
              <span className='text-sm text-gray-700'>
                {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
              </span>
            </h2>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Result