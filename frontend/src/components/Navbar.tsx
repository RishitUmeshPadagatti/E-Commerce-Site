import { useNavigate } from "react-router-dom";

function Navbar({ onLogout }: { onLogout: () => void }) {
	const navigate = useNavigate();

	return (
		<nav className="bg-white text-black shadow-md px-6 py-4 flex justify-between items-center">
			{/* Left: Site Name */}
			<div className="text-3xl font-bold">
				<button className="cursor-pointer" onClick={() => navigate("/dashboard")}>
					E-commerce Site
				</button>
			</div>

			{/* Right: Cart and Logout Buttons */}
			<div className="flex items-center gap-4">
				<button
					onClick={() => navigate("/cart")}
					className="bg-black text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition cursor-pointer">
					Cart
				</button>

				<button
					onClick={onLogout}
					className="bg-white text-black border border-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer">
					Logout
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
