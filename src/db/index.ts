import mongoose from "mongoose";
 
export default async function connectDB() {
  const url = process.env.MONGODB_URI || '';
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.error(err instanceof Error && err.message);
    throw err;
  }
  const dbConnection = mongoose.connection;
  
  /* dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  }); */
 
  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
  return;
}