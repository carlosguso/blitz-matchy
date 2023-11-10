import mongoose, { Schema, model } from 'mongoose';

interface IGames {
    game: {
        question: string;
        image: string;
        options: string[];
        answer: string;
    }
}
const GAMES = 'games'
const gamesSchema = new Schema<IGames>({
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
            return model(GAMES).findById(gameId);
        }
    }
});
const Games = mongoose.model.User ?? model<IGames>(GAMES, gamesSchema);

export default Games;