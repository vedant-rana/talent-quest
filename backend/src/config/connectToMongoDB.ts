import mongoose from "mongoose";
export const connectToMongoDB = async (
  connectionString: string | undefined
) => {
  try {
    if (!connectionString) {
      throw new Error("Connection string is required to connect to MongoDB.");
    }

    const conn = await mongoose.connect(connectionString);

    if (conn) {
      console.log("MongoDB connected successfully.");
    }
  } catch (error: any) {
    console.log("Error connecting to MongoDB : ", error.message);
  }
};
