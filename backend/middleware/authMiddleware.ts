import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).json({ error: "No token provided" });
		return;
	}

	const token = authHeader.split(" ")[1];
	try {
		if (!process.env.JWT_PASSWORD) {
			res.status(500).json({ error: "JWT secret not configured" });
			return;
		}

		jwt.verify(token, process.env.JWT_PASSWORD as string);
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
};

const prisma = new PrismaClient();

interface JwtPayload {
	userId: number;
}

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(401).json({ error: "No token provided" });
		return;
	}

	const token = authHeader.split(" ")[1];
	try {
		if (!process.env.JWT_PASSWORD) {
			res.status(500).json({ error: "JWT secret not configured" });
			return;
		}

		const decoded = jwt.verify(token, process.env.JWT_PASSWORD) as JwtPayload;

		const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		if (user.email !== "admin") {
			res.status(403).json({ error: "Access denied. Admins only." });
			return;
		}

		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
};