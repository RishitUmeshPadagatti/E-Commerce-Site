import { useEffect, useState } from "react";
import axios from "axios";
import type { ItemInterface } from "../utils/interfaces";
import { addItemToCartEndpoint, getItemsEndpoint } from "../utils/constants";

const Dashboard = () => {
	const [items, setItems] = useState<ItemInterface[]>([]);
	const [filteredItems, setFilteredItems] = useState<ItemInterface[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);

	// Categories stored client-side
	const categories = ["All", "Electronics", "Fashion", "Health", "Toys", "Books", "Gaming", "Cosmetics"];

	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem("user") as string).id
		axios.post(getItemsEndpoint, { userId: userId }, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				setItems(res.data);
				setFilteredItems(res.data);

				setIsLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching items:", err);

				setIsLoading(false)
			});
			
	}, []);

	useEffect(() => {
		let filtered = items;

		// Category filter
		if (selectedCategory !== "All") {
			filtered = filtered.filter((item) => item.category === selectedCategory);
		}

		// Search filter
		if (searchQuery.trim() !== "") {
			filtered = filtered.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredItems(filtered);
	}, [selectedCategory, searchQuery, items]);

	return (
		<div className="min-h-screen bg-white text-black p-6">

			{/* Filters Section */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				{/* Category Pills */}
				<div className="flex gap-3 flex-wrap">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setSelectedCategory(cat)}
							className={`px-5 py-2 rounded-full text-sm font-medium transition shadow-sm ${selectedCategory === cat
								? "bg-black text-white shadow-md"
								: "bg-white text-black border border-black"
								}`}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Search Bar */}
				<input
					type="text"
					placeholder="Search items..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="px-4 py-2 rounded-lg w-full sm:w-64 border border-black shadow-sm"
				/>
			</div>

			{isLoading ? (
				<p className="mt-6 text-center text-gray-600">Loading...</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{filteredItems.map((item) => (
						<div
							key={item.id}
							className="relative rounded-xl p-4 flex flex-col shadow-md hover:shadow-lg transition">
							<img
								src={item.imageUrl}
								alt={item.name}
								className="h-96 w-full object-cover mb-4 rounded-lg"/>
							<h2 className="text-xl font-semibold">{item.name}</h2>
							<p className="text-sm text-gray-600 mb-2">{item.description}</p>
							<p className="text-lg font-bold">₹{item.price}</p>
							<span className="text-sm mt-auto italic text-gray-500">{item.category}</span>

							{/* Cart Action Box */}
							<div className="absolute bottom-4 right-4">
								{item.inCart ? (
									<div className="bg-gray-300 text-black px-4 py-2 rounded-lg text-sm font-medium shadow-md">
										In Cart
									</div>
								) : (
									<button
										onClick={async () => {
											try {
												const userId = JSON.parse(localStorage.getItem("user") as string).id;
												await axios.post(
													addItemToCartEndpoint,
													{ userId, itemId: item.id, quantity: 1 },
													{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
												);

												// Update local state so button changes to "Already in Cart"
												setItems((prev) =>
													prev.map((i) =>
														i.id === item.id ? { ...i, inCart: true } : i
													)
												);
											} catch (err) {
												console.error("Failed to add to cart:", err);
											}
										}}
										className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-800 transition">
										Add to Cart
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			{/* No Results */}
			{filteredItems.length === 0 && !isLoading && (
				<p className="mt-6 text-center text-gray-600">No items found.</p>
			)}
		</div>
	);
};

export default Dashboard;