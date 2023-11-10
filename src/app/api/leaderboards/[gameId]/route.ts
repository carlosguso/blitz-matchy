import connectDB from "@/db"
import Games from "@/db/game";
import LeaderBoard from "@/db/leaderboard"
import { z } from 'zod'

const getPostSchema = () => {
  return z.object({
    user: z.string(),
    bestScoreSeconds: z.number(),
    bestScorePoints: z.number(),
  })
};

export async function GET(
    request: Request,
    { params }: { params: { gameId: string } }
  ) {
    const gameId = params.gameId
    try{
        await connectDB()
        const userScores = await LeaderBoard.find({ gameId });
        if (userScores) 
          return Response.json(userScores.map((elem) => elem.toJSON()));
        return Response.json({"error": "Leaderbord not found"}, { status: 404})
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
    const body = await request.json();
    const validate = getPostSchema();
    const validBody = validate.safeParse(body);
    if (!validBody.success) {
      const { errors } = validBody.error;
      return Response.json({"error": errors}, {status: 400})
    }
    const { user, bestScoreSeconds, bestScorePoints } = validBody.data;

    connectDB();
    const game = await Games.findById(gameId);
    if (!game) 
      return Response.json({"error": "Game Not Found"}, {status: 404})

    const userScore = await LeaderBoard.findOne({ gameId: game.id, user })
    if (userScore) {
      const hasNewBestScorePoints = bestScorePoints > userScore.bestScorePoints;
      const hasNewBestScoreSeconds = bestScoreSeconds > userScore.bestScoreSeconds;

      if (hasNewBestScorePoints) {
        userScore.bestScorePoints = body.bestScorePoints;
      }

      if (hasNewBestScoreSeconds){
        userScore.bestScoreSeconds = bestScoreSeconds;
      }

      if (hasNewBestScorePoints || hasNewBestScoreSeconds)
        await userScore.save()

      return Response.json(userScore.toJSON())
    }

    const newUserScore = new LeaderBoard({ user, bestScorePoints, bestScoreSeconds, gameId})
    await newUserScore.save()
    return Response.json(newUserScore.toJSON())
  } catch (e) {
    return Response.json({"error": String(e)}, {status: 500})
  }
}