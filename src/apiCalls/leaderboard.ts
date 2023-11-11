export interface LeaderboardScore {
    user: string;
    bestScoreSeconds: number;
    bestScorePoints: number;
}

export interface Leaderboard extends LeaderboardScore {
    _id: string;
    gameId: string;
}

export const getGameLeaderboard = async (gameId: string): Promise<Leaderboard[]> => {
    try {
        const res = await fetch(`/api/leaderboards/${gameId}`)
        const leaderboard: Leaderboard[] = await res.json();
        if (!leaderboard) {
            return [];
        }
        return leaderboard;
    } catch (e) {
        throw e;
    }
};

export const registerNewBestScore = async (gameId: string, data: LeaderboardScore): Promise<Leaderboard> => {
    try {
        const res = await fetch(`/api/leaderboards/${gameId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        const newScore: Leaderboard = await res.json();
        return newScore;
    } catch (error) {
        throw error;
    }
}