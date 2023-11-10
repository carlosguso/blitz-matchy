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

const modelRegistry = model<IGames>(GAMES, gamesSchema)
const Games = mongoose.model(GAMES) ?? modelRegistry;

export default Games;