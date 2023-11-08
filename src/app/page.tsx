'use client'
import getGame, { GameOption } from '@/apiCalls/game'
import Landing from '@/components/landing';
import Question from '@/components/question';
import Results from '@/components/results';
import { useGameStore } from '@/store';
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [game, setGame] = useState<GameOption[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const user = useGameStore((state) => state.user);
  const setUser = useGameStore((state) => state.setUser)
  const [error, setError] = useState('');
  const [results, setResults] = useState({
    "correct": 0,
    "incorrect": 0
  })
  
  const retrieveGame = async () => {
    try {
      const newGame = await getGame("someId");
      setGame(newGame)
    } catch (e: unknown) {
      let errorMessage = "Failed at getting the game";
      setError(errorMessage);
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    retrieveGame()
  }, [])

  useEffect(() => {
    setCurrentQuestion(0);
  }, [game])


  const updateQuestionResults = (result: Boolean) => {
    setCurrentQuestion(currentQuestion+1)
    if (result)
      setResults({...results, correct: results.correct + 1})
    else
      setResults({...results, incorrect: results.incorrect + 1})
  }

  const renderCurrentOption = () => {
    return game[currentQuestion] ? (<Question {...game[currentQuestion]} onAnswered={updateQuestionResults}/>) : <Results {...results}/>
  }

  const render = () => {
    if (error)
      return <h1>{error}</h1>
    if (!user)
      return <Landing user={user} onUserUpdate={(newUser: string) => setUser(newUser)}/>
    return renderCurrentOption()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {render()}
    </main>
  )
}
