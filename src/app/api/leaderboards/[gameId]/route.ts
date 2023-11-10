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

export async function POST(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const gameId = params.gameId
    const body: {
      user: string;
      bestScoreSeconds: number;
      bestScorePoints: number;
    } = await request.json();

    connectDB();
    const userScore = await LeaderBoard.findOne({ gameId, user: body.user })
    if (userScore) {
      if (body.bestScorePoints > userScore.bestScorePoints) {
        userScore.bestScorePoints = body.bestScorePoints;
      }

      if (body.bestScoreSeconds > userScore.bestScoreSeconds){
        userScore.bestScoreSeconds = body.bestScoreSeconds;
      }

      await userScore.save()
      return Response.json({userScore})
    }
    
    const newUserScore = new LeaderBoard({...body, gameId})
    await newUserScore.save()
    return Response.json(newUserScore)
  } catch (e) {
    return Response.json({"error": String(e)}, {status: 500})
  }
}