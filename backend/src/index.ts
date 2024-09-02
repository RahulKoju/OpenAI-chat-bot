import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./connection";
import userRoutes from "./routes/user.route";
import chatRoutes from "./routes/chat.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectToDatabase();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//error middleware
app.use(errorMiddleware);
