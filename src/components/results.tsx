'use client'

import { Leaderboard, getGameLeaderboard, registerNewBestScore } from "@/apiCalls/leaderboard";
import { useGameStore } from "@/store";
import { useEffect, useState } from "react";

interface ResultsProps {
    correct: number;
    incorrect: number;
    gameId: string;
    time: number;
}
export default function Results(props: ResultsProps) {
    const [loading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
    const user = useGameStore((state) => state.user);

    const registerScore = async () => {
        try {
            await registerNewBestScore(props.gameId, {
                user,
                bestScoreSeconds: props.time / 1000,
                bestScorePoints: props.correct,
            })
        } catch (e) {
            console.log("Error registering the new score", e);
        }

        try {
            const scores = await getGameLeaderboard(props.gameId);
            setLeaderboard(scores)
        } catch (e) {
            console.log("Error getting the leaderboard", e);
        }
        setLoading(false);
    };

    useEffect(() => {
        registerScore();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-evenly items-center mb-4 border-2 border-white rounded-md w-full">
                <h1>Your Results:</h1>
                <p>Correct: {props.correct}</p>
                <p>Incorrect: {props.incorrect}</p>
            </div>
            {!loading && leaderboard.length > 0 && 
                <div className="flex flex-col justify-evenly itemts-center w-full rounded-md border-transparent bg-indigo-600">
                    <h3 className="p-2 self-center text-xl">Leaderboard!</h3>
                    {
                        leaderboard.map((item, index) => 
                            <div key={item._id} className="grid grid-cols-4 p-2 w-full border-t-2 border-white">
                                <p>{index +1}</p>
                                <p>{item.user}</p>
                                <p>{item.bestScorePoints} points</p>
                                <p>{item.bestScoreSeconds} secs</p>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}