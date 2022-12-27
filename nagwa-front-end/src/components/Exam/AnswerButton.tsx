import React from 'react'

const AnswerButton = (props: any) => {

    return (
        <div className="col-span-1 mx-auto" onClick={() => props.clickHandler(props.text)}>
            <button className={`
            w-44  bg-transparent hover:bg-gray-500 py-2 px-4 rounded ${props.selectedAns === props.text ? 'bg-lime-800': 'bg-transparent'}
             text-gray-300 font-semibold hover:text-white
              border ${props.selectedAns === props.text ? "border-lime-300" : "border-gray-300"} hover:border-gray-600 focus:outline-none
            `}>
                {props.text}
            </button>
        </div>
    )
}

export default AnswerButton