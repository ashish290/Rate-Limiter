import express from "express";
import dotenv from "dotenv";
import Express from "./service/Express";
import cookieParser from "cookie-parser";
import { rateLimiter } from "./middleware/rateLimiter";

dotenv.config();

try {
  const StartServer = async () => {
    const app = express();
    const PORT = process.env.PORT!; 

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.use(rateLimiter);
    await Express(app);

    app.listen(PORT, () => {
      console.log(`Server is running on : ${PORT}`);
    });
  };
  StartServer();
} catch (error) {
  console.log("Server Error :", error);
}
