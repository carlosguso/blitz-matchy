interface UserDisplayProps {
    user: string;
}

export default function UserDisplay(props: UserDisplayProps) {
    return (
        <div className="absolute top-0 left-0 p-4">
            <p className="text-white">{props.user}</p>
        </div>
    )
}