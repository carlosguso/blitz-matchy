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

const Leaderboard = (mongoose.model as any).Leaderboard ?? model<ILeaderboard>(LEADERBOARD, leaderBoardSchema)

export default Leaderboard;