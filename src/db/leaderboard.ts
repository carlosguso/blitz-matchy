import mongoose, { Schema, model } from 'mongoose';

interface ILeaderboard {
    gameId: string;
    user: string;
    bestScoreSeconds: number;
    bestScorePoints: number;
}
const LEADERBOARD = 'LeaderBoard';
const leaderBoardSchema = new Schema<ILeaderboard>({
    gameId: String,
    user: String,
    bestScoreSeconds: Number,
    bestScorePoints: Number,
}, {
    statics: {
        findUserScore(user: string) {
            return model(LEADERBOARD).findOne({ user });
        }
    }
});

const modelRegistry = model<ILeaderboard>(LEADERBOARD, leaderBoardSchema)
const LeaderBoard = mongoose.model(LEADERBOARD) ?? modelRegistry;

export default LeaderBoard;