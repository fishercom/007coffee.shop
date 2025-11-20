import { useState } from "react";
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from "../services/api";
import { useAuth } from '../context/AuthContext'; // Import useAuth

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("jwt", token);

      // Fetch user profile after successful login
      const userProfileResponse = await api.get('/UserProfile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      login(userProfileResponse.data); // Call login from AuthContext with user data
      router.push('/');
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Head>
        <title>Login - The Gilded Emporium</title>
        <meta name="description" content="Access your account at The Gilded Emporium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
              Welcome Back
            </h2>
          </div>
          <form className="mt-8 space-y-6 bg-white p-10 shadow-lg rounded-lg" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-text-primary focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm transition"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-text-primary focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm transition"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline font-sans">{error}</span>
                </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-accent hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}