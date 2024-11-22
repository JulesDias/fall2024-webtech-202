"use client";

import { useState } from "react";
import { EvervaultCard } from "../../components/ui/evervault-card"; // Composant d'arrière-plan visuel

export default function LoginNativePage() {
  const [showPassword, setShowPassword] = useState(false); // Contrôle la visibilité du mot de passe

  return (
    <div className="flex items-center justify-center min-auto bg-gray-100 dark:bg-gray-900 rounded-3xl font">
      {/* Composant visuel pour l'effet d'arrière-plan */}
      <EvervaultCard className="absolute inset-0 rounded-3xl z-0" />

      <div className="relative z-10 p-8 bg-white rounded-3xl shadow-md dark:bg-gray-800">
        {/* Formulaire de connexion */}
        <form>
          <h2 className="text-3xl font-bold mb-6 dark:text-white font-FS_Sinclair">Login</h2>

          {/* Champ d'email */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 mb-4 font-FS_Sinclair"
          />

          {/* Champ de mot de passe */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Affiche le texte ou cache selon l'état
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 font-FS_Sinclair"
            />
            {/* Bouton pour basculer la visibilité du mot de passe */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Change l'état de visibilité
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 font"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"} {/* Emoji selon l'état */}
            </button>
          </div>

          {/* Bouton de soumission */}
          <button
            type="button"
            className="w-full py-2 mt-6 text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-600 font-FS_Sinclair"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
