import React, { useState } from 'react'

const Home = (props: any) => {
    const [quesIndex, setQuesIndex] = useState(0);

    const questions = props.questions
    return (
        (questions) ? (

            <>
                <div className=" mx-auto grid grid-cols-3 gap-1 w-screen h-screen ">
                    <div className="col-span-1">
                        <div className="progress">Progress Circle</div>
                        <div className="questionNumbers">
                            Numbers from 1-10
                        </div>
                        <div className="timer"></div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-between items-center h-full w-full">
                        <div className="flex justify-between">
                            <div>
                                <h2>Category: <span>words</span></h2>
                            </div>
                            <div>Profile</div>
                            <div>flag</div>
                        </div>
                        <div className="Question">
                            {questions[quesIndex].word}
                            <div className="answers">
                                <button>adverb</button>
                                <button>verb</button>
                                <button>noun</button>
                                <button>adjective</button>
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