import connectDB from "@/db"
import Games from "@/db/game"
export async function GET(
    request: Request,
    { params }: { params: { gameId: string } }
  ) {
    try {
      const gameId = params.gameId
      connectDB()
      const game = await Games.findById(gameId)
      if (game) {
        return Response.json(game.game)
      }
      return Response.json({"error": "Game not found"}, {status: 404})
    } catch (e) {
      console.error("An error happened on GET /api/games/<gameId> execution: ", e)
      return Response.json({"error": String(e)}, {status: 500})
    }
  }