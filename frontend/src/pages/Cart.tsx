import axios from "axios";
import { useEffect, useState } from "react";
import type { CartItemInterface } from "../utils/interfaces";

export default function Cart() {
	const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const userId = JSON.parse(localStorage.getItem("user") as string).id;

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const res = await axios.post(
					"http://localhost:3000/user/cart",
					{ userId },
					{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
				);
				setCartItems(res.data);
			} catch (err) {
				console.error("Failed to fetch cart:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCart();
	}, [userId]);

	const updateQuantity = async (cartItemId: number, newQty: number) => {
		if (newQty < 1) return;

		try {
			await axios.put(
				"http://localhost:3000/user/update-cart-quantity",
				{ cartItemId, quantity: newQty },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			);

			setCartItems((prev) =>
				prev.map((item) =>
					item.id === cartItemId ? { ...item, quantity: newQty } : item
				)
			);
		} catch (err) {
			console.error("Failed to update quantity:", err);
		}
	};

	const deleteCartItem = async (cartItemId: number) => {
		try {
			await axios.delete(
				"http://localhost:3000/user/delete-cart",
				{
					data: { cartItemId },
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);

			setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
		} catch (err) {
			console.error("Failed to delete cart item:", err);
		}
	};

	const totalCost = cartItems.reduce(
		(acc, item) => acc + item.quantity * item.item.price,
		0
	);

	if (isLoading) return <div className="p-6">Loading cart...</div>;

	return (
		<div className="min-h-screen bg-white text-black p-6">
			<h2 className="text-2xl font-bold mb-6">Your Cart</h2>

			{cartItems.length === 0 && <p>Your cart is empty.</p>}

			<div className="flex flex-col gap-6">
				{cartItems.map((cart) => (
					<div
						key={cart.id}
						className="flex bg-white shadow-md rounded-lg overflow-hidden relative"
					>
						{/* Image */}
						<img
							src={cart.item.imageUrl}
							alt={cart.item.name}
							className="w-48 h-48 object-cover"
						/>

						{/* Details */}
						<div className="p-4 flex flex-col flex-1">
							<h3 className="text-xl font-semibold">{cart.item.name}</h3>
							<p className="text-sm text-gray-600 mt-1">{cart.item.description}</p>
							<p className="text-lg font-bold mt-2">₹{cart.item.price}</p>
							<span className="text-sm italic text-gray-500">{cart.item.category}</span>

							{/* Quantity Controls */}
							<div className="mt-auto flex items-center gap-2">
								<button
									onClick={() => updateQuantity(cart.id, cart.quantity - 1)}
									className="px-3 py-1 border border-black rounded hover:bg-gray-100"
								>
									-
								</button>
								<span>{cart.quantity}</span>
								<button
									onClick={() => updateQuantity(cart.id, cart.quantity + 1)}
									className="px-3 py-1 border border-black rounded hover:bg-gray-100"
								>
									+
								</button>

								{/* Delete Button */}
								<button
									onClick={() => deleteCartItem(cart.id)}
									className="ml-auto px-3 py-1 border border-black rounded hover:bg-gray-100 text-red-600"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Total Cost and Checkout */}
			{cartItems.length > 0 && (
				<div className="mt-6 flex justify-between items-center">
					<div className="text-xl font-bold">Total: ₹{totalCost.toFixed(2)}</div>
					<button
						onClick={() => alert(`Total cost: ₹${totalCost.toFixed(2)}`)}
						className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
					>
						Checkout
					</button>
				</div>
			)}
		</div>
	);
}