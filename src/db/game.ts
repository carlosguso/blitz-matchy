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

const Games = model<IGames>(GAMES, gamesSchema)
const exported = mongoose.model(GAMES) ?? Games;

export default exported;