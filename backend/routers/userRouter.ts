import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const userRouter = express.Router();

const prisma = new PrismaClient();

// Getting all items
userRouter.post("/all-items", async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.body;

		if (!userId) {
			res.status(400).json({ error: "userId is required" });
			return;
		}

		// fetch all items
		const items = await prisma.item.findMany();

		// fetch user's cart items
		const cartItems = await prisma.cartItem.findMany({
			where: { userId: Number(userId) },
			select: { itemId: true },
		});

		const cartItemIds = new Set(cartItems.map(c => c.itemId));

		// attach inCart flag
		const itemsWithCartFlag = items.map(item => ({
			...item,
			inCart: cartItemIds.has(item.id),
		}));

		res.json(itemsWithCartFlag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch items" });
	}
})

// Getting all the items in the cart
userRouter.post("/cart", async (req: Request, res: Response): Promise<void> => {
	const { userId } = req.body;

	try {
		const cart = await prisma.cartItem.findMany({
			where: { userId: Number(userId) },
			include: { item: true }, // fetch item details too
		});

		res.json(cart);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch cart items" });
	}
})

// Adding item to cart
userRouter.post("/add-to-cart", async (req: Request, res: Response): Promise<void> => {
	const { userId, itemId, quantity = 1 } = req.body;

	if (!userId || !itemId) {
		res.status(400).json({ error: "userId and itemId are required" });
	}

	try {
		const cartItem = await prisma.cartItem.create({
			data: {
				userId: Number(userId),
				itemId: Number(itemId),
				quantity: Number(quantity),
			},
		});

		res.json(cartItem);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to add item to cart" });
	}
})

// Updating item count in cart
userRouter.put("/update-cart-quantity", async (req: Request, res: Response): Promise<void> => {
	const { quantity, cartItemId } = req.body;

	if (!quantity || quantity < 1) {
		res.status(400).json({ error: "Quantity must be >= 1" });
	}

	try {
		const updatedCartItem = await prisma.cartItem.update({
			where: { id: Number(cartItemId) },
			data: { quantity: Number(quantity) },
		});

		res.json(updatedCartItem);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to update cart item" });
	}
})

// Deleting item in cart
userRouter.delete("/delete-cart", async (req: Request, res: Response): Promise<void> => {
	const { cartItemId } = req.body;

	try {
		await prisma.cartItem.delete({
			where: { id: Number(cartItemId) },
		});

		res.json({ message: "Item removed from cart" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to remove item from cart" });
	}

})

export default userRouter;