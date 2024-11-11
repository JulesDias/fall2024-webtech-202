// app/login_native/page.js
"use client";

import { useState } from "react";
import { EvervaultCard } from "../../components/ui/evervault-card"; // Assurez-vous que le chemin est correct

export default function LoginNativePage() {
  const [formData, setFormData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const username = data.get("username");
    const password = data.get("password");

    setFormData({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <EvervaultCard className="max-w-md w-full p-8 bg-transparent shadow-md">
        <form onSubmit={handleSubmit} className="relative z-10 p-8 bg-white rounded-3xl shadow-md dark:bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Login</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 mb-4"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-600"
          >
            Submit
          </button>

          {formData && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="font-medium text-gray-900 dark:text-gray-300">Submitted Data:</p>
              <p className="text-gray-700 dark:text-gray-400">Username: {formData.username}</p>
              <p className="text-gray-700 dark:text-gray-400">Password: {formData.password}</p>
            </div>
          )}
        </form>
      </EvervaultCard>
    </div>
  );
}