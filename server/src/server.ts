import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 5050;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Successfully getting home page",
  });
});

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
  console.log(`Server is running on port ${PORT}`);
});
