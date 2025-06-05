"use client";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm({ onAuthSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async () => {
        try {
            const userCredential = isLogin
                ? await signInWithEmailAndPassword(auth, email, password)
                : await createUserWithEmailAndPassword(auth, email, password);

            onAuthSuccess(userCredential.user); // pass user to parent
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20 text-center">
            <h2 className="text-xl font-semibold mb-4">
                {isLogin ? "Login to TODOs" : "Create an Account"}
            </h2>
            <input
                className="border px-3 py-2 rounded mb-3 w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border px-3 py-2 rounded mb-4 w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleAuth}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-3"
            >
                {isLogin ? "Login" : "Signup"}
            </button>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-500"
            >
                {isLogin ? "New user? Signup" : "Already have an account? Login"}
            </button>
        </div>
    );
}
