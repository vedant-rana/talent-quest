import { app } from "./app.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/connectToMongoDB.js";

dotenv.config();

//connecting to MongoDB
connectToMongoDB(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
