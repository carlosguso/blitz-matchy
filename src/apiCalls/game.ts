import shuffle from "@/utils/shuffle";
import defaultGame from "./gameData";

export interface GameOption {
    question: string;
    image: string;
    options: string[];
    answer: string;
}

const getGame = async (gameId: string):Promise<GameOption[]> => {
    const res = await fetch(`/api/games/${gameId}`);
    const game: GameOption[] = await res.json();
    const currentGame = game;
    return shuffle(currentGame.map((gameItem) => {
        const shuffledOptions = shuffle(gameItem.options)
        return {...gameItem, options: shuffledOptions}
    }))
}

export default getGame;