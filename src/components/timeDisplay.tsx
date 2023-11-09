interface TimeDisplayProps {
    time: number;
}

export default function TimeDisplay(props: TimeDisplayProps) {
    return (
        <div className="absolute top-0 right-0 p-4">
            <p className="text-white">{props.time/1000} secs</p>
        </div>
    )
}