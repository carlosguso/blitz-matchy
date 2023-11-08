'use client'

import { FormEvent, useState } from "react";

interface LandingProps {
    user: string;
    onUserUpdate: (user: string) => void;
}

export default function Landing(props: LandingProps) {

    const [user, setUser] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        let errorMsg = ''
        e.preventDefault();
        if (!user)
            errorMsg = "User can't be empty"
            setError("User can't be empty")
        if (!errorMsg)
            props.onUserUpdate(user);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="fname">UserName:</label><br/>
            {error && <p className="text-red-300">Error: {error}</p>}
            <input 
            className="text-black" 
            type="text" 
            id="username" 
            name="fname" 
            value={user} 
            onChange={(e) => setUser(e.target.value)}
            /><br/>
            <button type="submit">Submit</button>
        </form>
    )

}