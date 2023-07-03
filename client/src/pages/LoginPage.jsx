/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/login", {
        email,
        password,
      });
      alert("Login Successful!");
    } catch (e) {
      alert("Login Failed! Please try again.");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          action=""
          className="max-w-md mx-auto"
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline text-bn">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}