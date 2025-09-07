import { useState } from "react";
import type { UserInterface } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signupEndpoint } from "../utils/constants";

interface AuthResponse {
	token: string;
	user: UserInterface;
}

function Signup({ onLogin }: { onLogin: (token: string, user: UserInterface) => void }) {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const res = await axios.post(signupEndpoint, {
			email,
			password,
			name,
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
					Create an Account
				</h2>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="w-full rounded-md border border-black/30 bg-white px-4 py-2 text-black placeholder-black/50 focus:border-black focus:outline-none"
					/>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
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
						className="rounded-md border cursor-pointer border-black bg-black px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-black">
						Sign Up
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-black/70">
					Already have an account?{" "}
					<a
						href="/login"
						className="font-semibold text-black hover:underline">
						Log in
					</a>
				</p>
			</div>
		</div>
	);
}

export default Signup
