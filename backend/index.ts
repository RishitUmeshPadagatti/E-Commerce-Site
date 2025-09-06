import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import {adminMiddleware, authMiddleware} from "./middleware/authMiddleware"
import authRouter from "./routers/authRouter"
import adminRouter from "./routers/adminRouter"
import userRouter from "./routers/userRouter"

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())

app.use(cors());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello")
})

app.use("/auth", authRouter);
app.use("/admin", adminMiddleware, adminRouter);
app.use("/user", authMiddleware, userRouter);

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
});