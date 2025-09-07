import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const adminRouter = express.Router();

const prisma = new PrismaClient();

// Create Item
adminRouter.post("/create-item", async (req: Request, res: Response): Promise<void> => {
	const { name, description, price, category, imageUrl } = req.body;
	try {
		const item = await prisma.item.create({
			data: { name, description, price, category, imageUrl },
		});
		res.json(item);
	} catch (err) {
		res.status(400).json({ error: "Unknown Error" });
	}
})

// Update Item
adminRouter.post("/update-item", async (req: Request, res: Response): Promise<void> => {
	const { id, name, description, price, category } = req.body;
	try {
		const item = await prisma.item.update({
			where: { id: Number(id) },
			data: { name, description, price, category },
		});
		res.json(item);
	} catch (err) {
		res.status(400).json({ error: "Error" });
	}
})

// Delete Item
adminRouter.post("/delete-item", async (req: Request, res: Response): Promise<void> => {
	const { id } = req.body;
	try {
		await prisma.item.delete({ where: { id: Number(id) } });
		res.json({ message: "Item deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: "Error" });
	}
})

export default adminRouter