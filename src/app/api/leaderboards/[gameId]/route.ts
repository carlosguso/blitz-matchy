import connectDB from "@/db"
import LeaderBoard from "@/db/leaderboard"

export async function GET(
    request: Request,
    { params }: { params: { gameId: string } }
  ) {
    const gameId = params.gameId
    try{
        await connectDB()
        const userScores = await LeaderBoard.find({ gameId });
        return Response.json(userScores);
    } catch (e) {
      return Response.json({"error": String(e)}, {status: 500})
    }
  }