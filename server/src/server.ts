import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 5050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});