import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface ILeaderBoard {
    gameId: string;
    user: string;
    bestScoreSeconds: number;
    bestScorePoints: number;
}
const LEADERBOARD = 'LeaderBoard';
const leaderBoardSchema = new Schema<ILeaderBoard>({
    gameId: String,
    user: String,
    bestScoreSeconds: Number,
    bestScorePoints: Number,
}, {
    methods: {
        findUserScore(user: string) {
            return model(LEADERBOARD).findOne({ user });
        }
    }
});

interface IGame {
    game: {
        question: string;
        image: string;
        options: string[];
        answer: string;
    }
}
const GAME = 'Game'
const gameSchema = new Schema<IGame>({
    game: [
        {
            question: String,
            image: String,
            options: [String],
            answer: String,
        }
    ],
}, {
    methods: {
        findByGameId(gameId: string) {
            return model(GAME).findById(gameId);
        }
    }
});

const Leaderboard = model(LEADERBOARD, leaderBoardSchema)
const Game = model(GAME, gameSchema);

const exports = {Leaderboard, Game};
export default exports;