interface TimeDisplayProps {
    time: number;
}

export default function TimeDisplay(props: TimeDisplayProps) {
    return (
        <div className="absolute top-2 right-2 p-2 border-2 rounded-md border-transparent bg-indigo-600">
            <p className="text-white text-sm">{props.time/1000} secs</p>
        </div>
    )
}