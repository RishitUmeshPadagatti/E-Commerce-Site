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
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await axios.post(loginEndpoint, {
				email,
				password,
			});

			const data = res.data as AuthResponse;

			if (data.token && data.user) {
				onLogin(data.token, data.user);
				navigate("/dashboard");
			} else {
				alert("Login failed: Invalid response from server");
			}
		} catch (error: any) {
			console.error("Login error:", error);
			alert(error.response?.data?.error || "Login failed. Please check your credentials.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-white">
			<div className="w-full max-w-sm rounded-lg border border-black/20 bg-white p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl font-bold text-black">
					Welcome Back testing
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
						disabled={isLoading}
						className={`flex items-center justify-center rounded-md border cursor-pointer border-black bg-black px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-black ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
					>
						{isLoading ? (
							<>
								<svg className="mr-2 h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Logging in...
							</>
						) : "Login"}
					</button>
				</form>


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
