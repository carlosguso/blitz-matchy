'use client'

interface ResultsProps {
    correct: number;
    incorrect: number;
}
export default function Results(props: ResultsProps) {
    return (
        <div>
            <h1>Your Results:</h1>
            <p>Correct: {props.correct}</p>
            <p>Incorrect: {props.incorrect}</p>
        </div>
    )
}