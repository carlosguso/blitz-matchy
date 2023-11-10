import defaultGame from "@/apiCalls/gameData"
import connectDB from "@/db"
import Games from "@/db/game"

export async function GET(
    request: Request,
    { params }: { params: { gameId: string } }
  ) {
    const gameId = params.gameId
    try{
        await connectDB()
        console.log("Connected: ", defaultGame)
        const newGame = new Games({game: defaultGame});
        await newGame.save()
        return Response.json(newGame);
    } catch (e) {
        console.log("Error connecting: ", e)
    }
    return Response.json({"val": gameId})
  }