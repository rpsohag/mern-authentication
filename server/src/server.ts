import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db";
import authRoutes from "./routes/auth.route";

dotenv.config();

const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Successfully getting home page",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new Error("Your Requested URL Not Found"));
});

app.use(<ErrorRequestHandler>function (err, req, res, next: NextFunction) {
  res.status(err.status || 500);
  res.json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});
