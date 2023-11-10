interface UserDisplayProps {
    user: string;
}

export default function UserDisplay(props: UserDisplayProps) {
    return (
        <div className="absolute top-2 left-2 p-2 border-2 rounded-md border-transparent bg-indigo-600">
            <p className="text-white text-sm">{props.user}</p>
        </div>
    )
}