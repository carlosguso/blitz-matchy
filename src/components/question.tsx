/* eslint-disable @next/next/no-img-element */
'use client'
import { GameOption } from '@/apiCalls'
import { useState } from 'react'

interface Question extends GameOption {
    onAnswered: (result: boolean) => void;
}

export default function Question(props: Question) {
    const [selected, setSelected] = useState<number|undefined>(undefined);

    const evalResponse = (index: number) => {
        setSelected(index)
        setTimeout(() => {
            setSelected(undefined);
            props.onAnswered(props.options[index] === props.answer);
        }, 1000);
    }

    const getOptionBackground = (value: string, index: number): string => {
        if (value === props.answer && selected !== undefined)
            return "bg-green-200"
        if (selected === index)
            return "bg-red-200"
        return "bg-white hover:bg-slate-100"
    }

    const listOptions = props.options.map((option, index) => (
        <button 
        key={`${option}_${index}`} 
        onClick={() => {evalResponse(index)}}
        className={`border-2 border-white rounded-md m-2 p-4 text-orange-600 w-full ${getOptionBackground(option, index)}`}
        >
          {option}
        </button>
    ))

    return (
    <>
        <div className="relative flex flex-col place-items-center">
            <img
            src={props.image}
            alt={`Image highly related to the question: ${props.question}`}
            className='border-4 rounded-md border-white w-full h-auto'
            />
             <h2 className='mt-2 text-xl'>
                {props.question}
            </h2>
        </div>
        <div className="mb-32 grid text-center gap-2 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left w-full">
            {listOptions}
        </div>
    </>
    )
}