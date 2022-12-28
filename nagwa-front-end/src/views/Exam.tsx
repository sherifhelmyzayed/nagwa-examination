import { useRef, useState } from 'react'
import AnswerButton from '../components/Exam/AnswerButton';
import gsap, { Power3 } from 'gsap';
import ProgressBar from '../components/Exam/ProgressBar';
import ModalIcon from '../components/Exam/ModalIcon';
import { useNavigate } from 'react-router-dom';


interface QuestionInterface {
    id: number;
    word: string;
    pos: string;
    answer: string | null;
}

interface QuestionsInterface extends Array<QuestionInterface> { }

const answers = ["adverb", "verb", "noun", "adjective"];




const Home = (props: any) => {
    const [quesIndex, setQuesIndex] = useState<number>(0);
    const [selectedAns, setSelectedAns] = useState<string | null>(null);
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState<number>(0);
    const navigate = useNavigate();

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

        // disable congratz text
        gsap.to(congratMsg.current, {
            css: {
                opacity: 0,
            },
            duration: 0.01,
            ease: Power3.easeInOut
        });


        // handling circles animations
        const targets = document.getElementsByClassName(".circles");
        gsap.to(targets[quesIndex], {
            css: {
                backgroundColor: 'green'
            }
        })

        // setting answers in here and parent state
        setSelectedAns(ans);
        setQuestions((current: QuestionsInterface) => {
            const filteredQues = current.find((item: QuestionInterface) => item.id === questions[quesIndex].id);
            if (!filteredQues) {
                return
            }
            filteredQues.answer = ans
            return (current)
        })

        // calculating answered questions count
        calculateAnsweredQuestionsCount();

    }

    const handleSwitchQues = (newId: number) => {
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

    const endExam = () => {
        let counter = 0;
        questions.map((item: any) => {
            if (item.answer !== item.pos) {
                return
            }
            counter++
        })
        props.setScore(counter);
        navigate('/result')
    }



    return (
        (questions) ? (
            <div className=" mx-auto grid grid-cols-3 gap-1 w-screen h-screen ">


                {/* Left-Side-Column */}
                <div className="col-span-1 bg-white px-5 flex flex-col justify-between items-center  py-10 ">
                    <ProgressBar answeredQuestionsCount={answeredQuestionsCount} total={questions.length} />
                    <div className='w-full flex flex-wrap'>
                        {questions.map((item: QuestionInterface, key: number) => (
                            <div className={`w-10 h-10 rounded-full .circles ${questions[quesIndex].answer ? 'bg-lime-700' : 'bg-gray-300'} bg-gray-300 mx-1 mb-1 ${quesIndex === key ? 'border border-lime-600' : null} cursor-pointer`}>
                                <div className="mx-auto text-white w-full  h-full flex justify-center items-center" key={key} onClick={() => handleSwitchQues(key)}>
                                    {key + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-gray-700 font-medium text-sm">Questions Unanswered: {questions.length - answeredQuestionsCount}</h2>
                </div>



                {/* Right-Side-Column */}
                <div className="col-span-2 flex flex-col justify-between items-center h-full w-full bg-gray-200 pb-10 relative">


                    {/* Header */}
                    <div className="flex justify-between w-full pt-3 px-5">
                        <div>
                            <h2 className='text-gray-500 text-sm font-medium'>Category: <span className='text-lime-500 text-sm font-semibold'>words</span></h2>
                        </div>
                        <div>
                            <h2 ref={congratMsg} className='text-center text-lime-800 font-bold text-xl opacity-0'>Hurray! You got it right</h2>
                        </div>
                        <ModalIcon />
                    </div>


                    {/* Question Bar */}
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
                            {answers.map((item: string) => (
                                <AnswerButton selectedAns={selectedAns} clickHandler={selectAnswer} text={item} />
                            ))}
                        </div>
                    </div>


                    {/* Action Buttons*/}
                    <div className="actionButtons">
                        {answeredQuestionsCount !== questions.length ? (
                            <button className={`
                                w-44  bg-lime-700 hover:bg-lime-500 py-2 px-4 rounded
                                text-white font-semibold hover:text-white
                                focus:outline-none 
                                disabled:opacity-50 disabled:cursor-not-allowed

                                `}
                                onClick={() => handleSwitchQues(quesIndex + 1)}
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
                            </button>
                        )}


                    </div>
                </div>
            </div>
        ) : null
    )
}

export default Home