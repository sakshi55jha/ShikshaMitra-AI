import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // ✅ new state for name
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Email/Password Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // ✅ Save display name
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        // 🔄 Force reload to get the updated displayName
        await auth.currentUser.reload();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google Authentication
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Create Account" : "Login"}
        </h2>

        {/* Email/Password Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 py-2 rounded-lg font-medium shadow-sm transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            Continue with Google
          </button>
        </div>

        {/* Switch between Login / Signup */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
