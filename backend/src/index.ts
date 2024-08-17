import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./connection";
import userRoutes from "./routes/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectToDatabase();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Routes
app.use("/api/user", userRoutes);

//error middleware
app.use(errorMiddleware);
