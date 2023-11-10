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
            errorMsg = "User can't be empty!"
            setError(errorMsg)
        if (!errorMsg)
            props.onUserUpdate(user);
    }

    return (
        <div className="flex flex-col justify-center items-center my-auto">
            <div className="flex flex-col justify-center items-center">
                <h1 className="w-full text-xl text-white border-2 rounded-md p-2 border-white text-center hover:bg-orange-500">BLITZ MATCHING</h1>
                <h1 className="w-full text-lg mt-2">Vocabulary Matching Game</h1>
            </div>
            <form className="w-full mt-4" onSubmit={handleSubmit}>
                <label htmlFor="fname" className="w-full text-lg">Username:</label><br/>
                {error && <p className="text-indigo-200 w-full">Error: {error}</p>}
                <input 
                className="text-black w-full rounded-md p-2 text-orange-600" 
                type="text" 
                id="username" 
                name="fname" 
                value={user} 
                onChange={(e) => setUser(e.target.value)}
                /><br/>
                <button type="submit" className="border-2 border-white rounded-md mt-2 text-xl w-full text-orange-600 bg-white hover:bg-orange-100">Start Game !</button>
            </form>
        </div>
    )

}