import React, { useState } from 'react'
import AnswerButton from '../components/AnswerButton';

const Home = (props: any) => {
    const [quesIndex, setQuesIndex] = useState<number>(0);
    const [selectedAns, setSelectedAns] = useState<string | null>(null);

    const questions = props.questions;

    const selectAnswer = (ans: string) => {

        // if there is no selected answer. Check for the correct answer and play animation
        if (!selectedAns) {
            console.log(questions[quesIndex].pos === ans);
        }

        setSelectedAns(ans);

    }


    return (
        (questions) ? (

            <>
                <div className=" mx-auto grid grid-cols-3 gap-1 w-screen h-screen ">
                    <div className="col-span-1 bg-white">
                        <div className="progress">Progress Circle</div>

                        <div>
                            Questions Circles
                        </div>
                        <div className="timer">
                            Timer
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-between items-center h-full w-full bg-gray-200">
                        <div className="flex justify-between">
                            <div>
                                <h2>Category: <span>words</span></h2>
                            </div>
                            <div>Profile</div>
                            <div>flag</div>
                        </div>
                        <div className="Question">
                            <div className='text-gray-500 text-center mb-10'>
                                <p>

                                    Question no. {quesIndex + 1} / {questions.length}
                                </p>
                                <h2 className='text-lg font-semibold'>
                                    {questions[quesIndex].word}

                                </h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-96 ">
                                <AnswerButton selectedAns={selectedAns} clickHandler={selectAnswer} text={"adverb"} />
                                <AnswerButton selectedAns={selectedAns} clickHandler={selectAnswer} text={"verb"} />
                                <AnswerButton selectedAns={selectedAns} clickHandler={selectAnswer} text={"noun"} />
                                <AnswerButton selectedAns={selectedAns} clickHandler={selectAnswer} text={"adjective"} />
                            </div>
                        </div>
                        <div className="actionButtons">
                            <button>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    )
}

export default Home