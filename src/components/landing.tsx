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
        <div className="flex flex-col justify-center items-center my-auto">
            <h1 className="w-full">VOCABULARY MATCHING GAME</h1>
            <form className="w-full mt-8" onSubmit={handleSubmit}>
                <label htmlFor="fname" className="w-full">Username:</label><br/>
                {error && <p className="text-red-300 w-full">Error: {error}</p>}
                <input 
                className="text-black w-full" 
                type="text" 
                id="username" 
                name="fname" 
                value={user} 
                onChange={(e) => setUser(e.target.value)}
                /><br/>
                <button type="submit" className="border-2 border-white rounded-sm mt-2 text-black w-full bg-white hover:bg-slate-100">Start Game</button>
            </form>
        </div>
    )

}