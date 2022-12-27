import { useRef, useState } from 'react'
import AnswerButton from '../components/AnswerButton';
import gsap, { Power3 } from 'gsap';
import ProgressBar from '../components/ProgressBar';


interface QuestionInterface {
    id: number;
    word: string;
    pos: string;
    answer: string | null;
}

interface QuestionsInterface extends Array<QuestionInterface> { }


const showBarFun = () => {
    gsap.to('.svgMain', {
        rotate: 225,
        duration: 1,
        ease: Power3.easeInOut
    })

    gsap.to('.point2', {
        rotate: 90,
        x: 5,
        y: -1,
        duration: 1,
        ease: Power3.easeInOut
    })

    gsap.to('.sideBarRef', {

        duration: 1,
        css: { zIndex: 5, opacity: 1 },
    })


}

const hideBarFun = () => {
    gsap.to('.svgMain', {

        rotate: 0,
        duration: 1,
        ease: Power3.easeInOut
    })

    gsap.to('.point2', {
        rotate: 0,
        x: 0,
        y: 0,
        duration: 1,
        ease: Power3.easeInOut
    });

    gsap.to('.sideBarRef', {
        duration: 1,
        css: { zIndex: -2, opacity: 0 },

    })

}

const Home = (props: any) => {
    const [showBar, setShowBar] = useState(false);
    const [quesIndex, setQuesIndex] = useState<number>(0);
    const [selectedAns, setSelectedAns] = useState<string | null>(null);
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState<number>(0);

    const congratMsg = useRef<HTMLHeadingElement>(null);

    const questions: QuestionsInterface = props.questions;
    const setQuestions = props.setQuestions;

    const selectAnswer = (ans: string) => {
        // if there is no selected answer. Check for the correct answer and play animation
        if (!selectedAns && questions[quesIndex].pos === ans) {
            gsap.to(congratMsg.current, {
                css: {
                    opacity: 1,
                },
                duration: 0.5,
                ease: Power3.easeInOut
            });
        }
        gsap.to(congratMsg.current, {
            css: {
                opacity: 0,
            },
            duration: 0.01,
            ease: Power3.easeInOut
        });
        setSelectedAns(ans);
        setQuestions((current: QuestionsInterface) => {
            const filteredQues = current.find((item: QuestionInterface) => item.id === questions[quesIndex].id);
            if (!filteredQues) {
                return
            }
            filteredQues.answer = ans
            return (current)
        })
        calculateAnsweredQuestionsCount();

    }

    const handleOtherQues = (newId: number) => {
        gsap.to(congratMsg.current, {
            css: {
                opacity: 0,
            },
            duration: 0.01,
            ease: Power3.easeInOut
        });
        if (questions[newId].answer) {
            setSelectedAns(questions[newId].answer)
        }
        else {
            setSelectedAns(null)
        }
        setQuesIndex(newId);
    }

    const endExam = () => {

    }

    const calculateAnsweredQuestionsCount = () => {
        let count = 0
        props.questions.map((item: any) => {
            if (!item.answer) {
                return
            }
            count++
        })
        setAnsweredQuestionsCount(count)
    }


    return (
        (questions) ? (
            <>
                <div className=" mx-auto grid grid-cols-3 gap-1 w-screen h-screen ">
                    <div className="col-span-1 bg-white px-5 flex flex-col justify-between items-center  py-10 ">
                        <div className="mx-auto w-48 flex flex-col justify-between items-center">
                            <ProgressBar questions={questions} total={questions.length} />
                        </div>
                        <div className='w-full flex flex-wrap'>
                            {questions.map((item: QuestionInterface, key: number) => (
                                <div className={`w-10 h-10 rounded-full ${questions[key].answer ? 'bg-lime-700' : 'bg-gray-300'} bg-gray-300 mx-1 mb-1 ${quesIndex === key ? 'border border-lime-600' : null} cursor-pointer`}>
                                    <div className="mx-auto text-white w-full  h-full flex justify-center items-center" key={key} onClick={() => handleOtherQues(key)}>
                                        {key + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-gray-700 font-medium text-sm">Questions Unanswered: {questions.length - answeredQuestionsCount}</h2>
                    </div>
                    <div className="col-span-2 flex flex-col justify-between items-center h-full w-full bg-gray-200 pb-10 relative">
                        <div className="flex justify-between w-full pt-3 px-5">
                            <div>
                                <h2 className='text-gray-500 text-sm font-medium'>Category: <span className='text-lime-500 text-sm font-semibold'>words</span></h2>
                            </div>
                            <div>
                                <h2 ref={congratMsg} className='text-center text-lime-800 font-bold text-xl opacity-0'>Hurray! You got it right</h2>
                            </div>
                            <div className="cursor-pointer z-10 w-10 mt-2" onClick={() => {
                                if (showBar) {
                                    hideBarFun()
                                } else {
                                    showBarFun()
                                }
                                setShowBar(!showBar)
                            }}>
                                <svg width="20px" height="20px" viewBox="0 0 10 10" className='svgMain'>
                                    <line className="point " x1="-5" x2="10" y1="5" y2="5" />
                                    <line className="point point2" x1="0" x2="10" y1="1" y2="1" />
                                </svg>
                            </div>
                        </div>
                        <div className="Question relative -mt-20">
                            <div className='text-gray-500 text-center mb-10'>
                                <p>
                                    Question no. {quesIndex + 1} / {questions.length}
                                </p>
                                <h2 className='text-2xl font-semibold mt-2'>
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
                            {answeredQuestionsCount !== questions.length ? (
                                <button className={`
                                w-44  bg-lime-700 hover:bg-lime-500 py-2 px-4 rounded
                                text-white font-semibold hover:text-white
                                focus:outline-none 
                                disabled:opacity-50 disabled:cursor-not-allowed

                                `}
                                    onClick={() => handleOtherQues(quesIndex + 1)}
                                    disabled={(quesIndex + 1) === questions.length}
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button className={`
                                w-44 bg-red-800 hover:bg-red-500 py-2 px-4 rounded
                                text-white font-semibold hover:text-white
                                border   border-red-300 hover:border-gray-600 focus:outline-none
                                `}
                                    onClick={() => endExam()}
                                >
                                    End Exam
                                </button>)}
                        </div>
                    </div>
                </div>
            </>
        ) : null
    )
}

export default Home