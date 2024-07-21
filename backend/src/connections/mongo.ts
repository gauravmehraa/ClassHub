import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
  try{
    if(!process.env.MONGODB_URL){
      throw new Error("No DB URL defined");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("[CONNECT] - Connected to MongoDB");
  }
  catch (error){
    console.log("[ERROR] - MongoDB: " + (error as Error).message);
  }
}