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
        className={`border-2 border-black rounded-md m-2 p-4 text-black w-full ${getOptionBackground(option, index)}`}
        >
          {option}
        </button>
    ))

    return (
    <>
        <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <img
            src={props.image}
            alt={`Image highly related to the question: ${props.question}`}
            className='border-2 border-red-700 w-40 h-auto'
            />
             <h2 className='mt-2'>
                {props.question}
            </h2>
        </div>
        <div className="mb-32 grid text-center gap-2 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left w-full">
            {listOptions}
        </div>
    </>
    )
}