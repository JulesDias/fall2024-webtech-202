"use client";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const username = data.get("username");
    const password = data.get("password");

    console.log("Username:", username);
    console.log("Password:", password);

    setFormData({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-gray-800 rounded-md transition hover:bg-gray-700 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        {formData && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="text-gray-900 dark:text-gray-300 font-medium">Submitted Data:</p>
            <p className="text-gray-700 dark:text-gray-400">Username: {formData.username}</p>
            <p className="text-gray-700 dark:text-gray-400">Password: {formData.password}</p>
          </div>
        )}
      </div>
    </div>
  );
}
