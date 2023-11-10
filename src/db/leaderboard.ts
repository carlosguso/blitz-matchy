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
    methods: {
        findUserScore(user: string) {
            return model(LEADERBOARD).findOne({ user });
        }
    }
});

const Leaderboard = model<ILeaderboard>(LEADERBOARD, leaderBoardSchema)
const exported = mongoose.model(LEADERBOARD) ?? Leaderboard;

export default exported;