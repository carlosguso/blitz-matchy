import connectDB from "@/db"

export async function GET(
    request: Request,
    { params }: { params: { gameId: string } }
  ) {
    try {
      const gameId = params.gameId
      connectDB()
      return Response.json({"val": gameId})
    } catch (e) {
      return Response.json({"error": String(e)}, {status: 500})
    }
  }