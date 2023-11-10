'use client'
import getGame, { GameOption } from '@/apiCalls/game'
import Landing from '@/components/landing';
import Question from '@/components/question';
import Results from '@/components/results';
import TimeDisplay from '@/components/timeDisplay';
import UserDisplay from '@/components/userDisplay';
import { useGameStore } from '@/store';
import { useEffect, useState } from 'react'

let preLoadedImg = undefined;
let stopWatch = null;

const preloadImg = (url: string) => {
  if (url) {
    const img = new window.Image();
    img.src = url;
    preLoadedImg = img;
  } else {
    preLoadedImg = undefined;
  }
}

class StopWatch {
  start: Date;
  updateInterval: number;
  interval: ReturnType<typeof setInterval>|null = null;
  end: Date|undefined;
  render: (time: number) => void;

  constructor(start: Date, updateInterval: number, triggerRender: (time: number) => void) {
    this.start = start;
    this.updateInterval = updateInterval
    this.render = triggerRender;
    this.startTime()
  }

  startTime() {
    if(!this.interval){
      this.interval = setInterval(() => {this.updateTime()}, this.updateInterval)
    }
  }

  updateTime() {
    const delta = Date.now() - new Date(this.start).getTime();
    this.render(delta);
  }

  stopTime() {
    if(this.interval) {
      clearInterval(this.interval)
      this.interval = null;
    }
  }

}

export default function Home({ params }: { params: { gameId: string }}) {
  const [game, setGame] = useState<GameOption[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(0);
  const user = useGameStore((state) => state.user);
  const setUser = useGameStore((state) => state.setUser)
  const [error, setError] = useState('');
  const [results, setResults] = useState({
    "correct": 0,
    "incorrect": 0
  })
  
  const retrieveGame = async (id: string) => {
    try {
      const newGame = await getGame(id);
      setGame(newGame)
    } catch (e: unknown) {
      let errorMessage = "Failed at getting the game";
      setError(errorMessage);
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      console.error('Error retrieving the game: ', errorMessage);
    }
  }

  useEffect(() => {
    retrieveGame(params.gameId);
  }, [])

  useEffect(() => {
    preloadImg(game[0]?.image)
    setCurrentQuestion(0);
  }, [game])

  useEffect(() => {
    preloadImg(game[currentQuestion+1]?.image)
  }, [currentQuestion, user])


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

  const startGame = (newUser: string) => {
    setUser(newUser)
    stopWatch = new StopWatch(new Date(), 100, (newTime: number) => setTime(newTime));
  };

  const render = () => {
    if (error)
      return <h1>{error}</h1>
    if (!user)
      return <Landing user={user} onUserUpdate={startGame}/>
    return renderCurrentOption()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-orange-600 to-orange-500">
      {time > 0 && <TimeDisplay time={time}/>}
      {user && <UserDisplay user={user}/>}
      {render()}
    </main>
  )
}
