import mongoose from "mongoose";
 
export default async function connectDB() {
  console.log('process.env.MONGODB_URI:' , process.env.MONGODB_URI)
  const url = process.env.MONGODB_URI || '';
 
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.error(err instanceof Error && err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}