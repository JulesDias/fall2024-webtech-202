"use client";

import { useState } from "react";
import { EvervaultCard } from "../../components/ui/evervault-card";

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
    <div className="flex items-center justify-center min-auto bg-gray-100 dark:bg-gray-900 rounded-3xl font">
      {/* Fond Evervault avec z-index négatif pour qu'il reste en arrière-plan */}
      <EvervaultCard className="absolute inset-0 rounded-3xl z-0" />

      {/* Formulaire principal */}
      <div className="relative z-10 p-8 bg-white rounded-3xl shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 dark:text-white font-FS_Sinclair">Login</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 mb-4 font-FS_Sinclair"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 font-FS_Sinclair"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 font"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-6 text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-600 font-FS_Sinclair"
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
      </div>
    </div>
  );
}
