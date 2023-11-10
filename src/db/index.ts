import mongoose from "mongoose";
 
export default async function connectDB() {
  const url = process.env.MONGODB_URI || '';
  console.log('DB URI: ', url)
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.error(err instanceof Error && err.message);
    throw err;
    //process.exit(1);
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