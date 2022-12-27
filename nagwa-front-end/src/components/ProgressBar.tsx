import { useEffect, useRef } from "react";
import gsap, { Power3 } from "gsap";

const ProgressBar = (props: any) => {
    let count = 0
    props.questions.map((item:any)=>{
        if(!item.answer) {
            return
        }
        count ++
    })
    const progressPercentage = Math.round(count / props.total * 100);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(progressBarRef.current, {
            css: {
                width: `${progressPercentage}%`,
                backgroundColor: `rgba(${2.55 * (100 - progressPercentage)}, ${2.55 * progressPercentage}, 0)`
            },
            duration: 1,
            ease: Power3.easeInOut
        })


    }, [props])

    return (
        <>
            <h2 className="text-gray-700 font-medium text-sm">{progressPercentage}% Completed!</h2>
            <div className='h-1 w-full bg-gray-300 transition-all'>
                <div
                    ref={progressBarRef}
                    style={{ width: `0%` }}
                    className={`h-full `}>
                </div>
            </div>
        </>
    );
};

export default ProgressBar


