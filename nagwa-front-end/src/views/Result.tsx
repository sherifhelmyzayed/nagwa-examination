import { useEffect, useState } from 'react'
import axios from 'axios';
import ModalIcon from '../components/Exam/ModalIcon';
import { useNavigate } from 'react-router-dom';

const Result = (props: any) => {
  const [rank, setRank] = useState<number | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    axios.post(`http://localhost:4000/rank/${props.score}`, {})
      .then(res => {
        setRank(res.data)
      });

  }, []);

  useEffect(() => {
    // if no score
    if (!props.score) {
      navigate('../')
    }
  }, [])

  const handleRestartExam = () => {
    props.setRefresh(!props.refresh)
    navigate('../')
  }




  return (
    <>
      {props.score ? (
        <div className='w-screen h-screen flex justify-between items-center flex-col bg-gray-300 pb-20 '>
          {/* Header */}
          <div className="flex justify-between w-full pt-3 px-5">
            <div>
              <h2 className='text-gray-500 text-sm font-medium'>Category: <span className='text-lime-500 text-sm font-semibold'>result</span></h2>
            </div>
            <button className={`
                        w-44  bg-lime-700 hover:bg-lime-500 py-2 px-4 rounded
                        text-white font-semibold hover:text-white
                        focus:outline-none 
                        disabled:opacity-50 disabled:cursor-not-allowed

                        `}
              onClick={() => handleRestartExam()}
            >
              Restart Exam
            </button>
            <ModalIcon />
          </div>
          <div className="rounded bg-white px-20 py-5">
            <h2 className='text-center text-lime-800 font-bold text-xl '>Your score is: {props.score}</h2>
          </div>

          <div className="grid grid-cols-3 gap-10 w-screen px-20 ">
            <div className="col-span-1">
              <div className="rounded bg-white px-20 py-5">
                <h2 className='text-center text-lime-800 font-bold text-xl '>Wrong answers are: </h2>
                {props.questions.map((item: any, key: number) => {

                  if (item.answer !== item.pos) {
                    return (
                      <li className='text-red-800'>
                        {item.word}
                      </li>
                    )
                  }
                })}
              </div>
            </div>
            <div className="col-span-2 h-full">
              <div className="rounded bg-white px-20 py-5">
                <h2 className='text-center font-bold text-xl text-red-600 mb-20'>Your Rank among 30 competitors:
                </h2>
                <h2 className='text-center font-bold text-6xl text-red-600'>
                  {rank}
                  <span className='text-sm text-gray-700'>
                    {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
                  </span>
                </h2>

              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Result