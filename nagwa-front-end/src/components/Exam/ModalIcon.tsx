import { useState } from "react";
import gsap, { Power3 } from "gsap";


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

    gsap.to('.modalRef', {

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

    gsap.to('.modalRef', {
        duration: 1,
        css: { zIndex: -2, opacity: 0 },

    })

}

const ModalIcon = () => {
    const [showBar, setShowBar] = useState(false);

    return (
        <>
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
            <div className="fixed h-screen w-screen bg-gray-700 top-0 left-0 flex flex-col pt-24 pl-10 text-center modalRef opacity-0" style={{ zIndex: -1 }}>
                <h2 className='text-xl mb-10'>Full-stack Project Made using: React, Tailwind, Typescript, NodeJS</h2>
                <h2 className='text-xl mb-10'>Additional features added:</h2>
                <ul>
                    <li>Quesions toggle through the left circles</li>
                    <li>Answered questions counter to track user progress</li>
                    <li>Added creative animations in GSAP</li>
                    <li>User cannot go into result page if not taken the exam</li>
                    <li>User can know wrong answers in result page</li>

                </ul>
            </div>
        </>
    )
}

export default ModalIcon