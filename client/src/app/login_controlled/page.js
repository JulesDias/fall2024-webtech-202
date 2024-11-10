"use client";

import { useState } from "react";

export default function LoginControlledPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Update formData state when input values change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Check if passwords match when either password or confirmPassword changes
    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        formData.password === value || name === "password" ? value === formData.confirmPassword : true
      );
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-400 dark:from-gray-900 dark:to-gray-700">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Signup
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
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-12 right-3 flex items-center justify-center text-gray-500 dark:text-gray-300"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-gray-800 rounded-md transition hover:bg-gray-700 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
