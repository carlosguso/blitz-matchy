import mongoose, { Schema, model } from 'mongoose';

interface ILeaderboard {
    gameId: string;
    user: string;
    bestScoreSeconds: number;
    bestScorePoints: number;
}
const LEADERBOARD = 'leaderboard';
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

const LeaderboardModel = () => mongoose.model<ILeaderboard>(LEADERBOARD, leaderBoardSchema)

const Leaderboard = (mongoose.models.leaderboard || LeaderboardModel()) as ReturnType<
  typeof LeaderboardModel
>

export default Leaderboard;