import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import type { UserInterface } from "./utils/interfaces";
import Navbar from "./components/Navbar";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token"));

	const handleLogin = (newToken: string, user: UserInterface) => {
		localStorage.setItem("token", newToken);
		localStorage.setItem("user", JSON.stringify(user))
		setToken(newToken);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
	};

	return (
		<Router>
			{token && <Navbar onLogout={handleLogout} />}

			<Routes>
				<Route path="/login" element={<Login onLogin={handleLogin} />} />
				<Route path="/signup" element={<Signup onLogin={handleLogin} />} />

				{/* Protected routes */}
				<Route
					path="/dashboard"
					element={token ? <Dashboard /> : <Navigate to="/login" />}
				/>
				<Route
					path="/cart"
					element={token ? <Cart /> : <Navigate to="/login" />}
				/>

				{/* Default route */}
				<Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
			</Routes>
		</Router>
	);
}

export default App;
