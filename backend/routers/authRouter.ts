import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

const prisma = new PrismaClient();

authRouter.post("/signup", async (req: Request, res: Response) => {
	const { email, password, name } = req.body;
	const hashed = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: { email, password: hashed, name },
		});
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: "User already exists" });
	}
})

authRouter.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		res.status(400).json({ error: "Invalid email or password" });
		return;
	}

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		res.status(400).json({ error: "Invalid email or password" });
		return;
	}

	const jwtSecret = process.env.JWT_PASSWORD;
	if (!jwtSecret) {
		res.status(500).json({ error: "JWT secret is not defined in environment variables" });
		return;
	}
	const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1d" });
	res.json({ token });
})

export default authRouter