import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserInterface } from "../utils/interfaces";
import axios from "axios";
import { loginEndpoint } from "../utils/constants";

interface AuthResponse {
	token: string;
	user: UserInterface;
}

function Login({ onLogin }: { onLogin: (token: string, user: UserInterface) => void }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const res = await axios.post(loginEndpoint, {
			email,
			password,
		});

		const data = res.data as AuthResponse;

		if (data.token && data.user) {
			onLogin(data.token, data.user);
			navigate("/dashboard");
		} else {
			alert("Login failed");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-white">
			<div className="w-full max-w-sm rounded-lg border border-black/20 bg-white p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl font-bold text-black">
					Welcome Back
				</h2>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="w-full rounded-md border border-black/30 bg-white px-4 py-2 text-black placeholder-black/50 focus:border-black focus:outline-none"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="w-full rounded-md border border-black/30 bg-white px-4 py-2 text-black placeholder-black/50 focus:border-black focus:outline-none"
					/>
					<button
						type="submit"
						className="rounded-md border cursor-pointer border-black bg-black px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-black"
					>
						Login
					</button>
				</form>

				{/* Info textbox */}
				<div className="mt-4 rounded-md border border-yellow-400 bg-yellow-50 p-3 text-xs text-yellow-800">
					⚠️ The backend's free instance will spin down with inactivity, which can delay requests by 50 seconds or more.
				</div>

				<p className="mt-6 text-center text-sm text-black/70">
					Don't have an account?{" "}
					<a
						href="/signup"
						className="font-semibold text-black hover:underline"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

export default Login
