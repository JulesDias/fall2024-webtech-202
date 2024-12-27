"use client";

import { useState } from "react";
import { EvervaultCard } from "../../components/ui/evervault-card"; // Composant d'arrière-plan visuel
import { supabase } from "../../lib/supabaseClient"; // Le client Supabase configuré
import { IconBrandGithub, IconBrandDiscord } from "@tabler/icons-react";
import { useRouter } from "next/navigation"; // Importer le hook useRouter
import md5 from "blueimp-md5"; // Importer le hash MD5

// Fonction pour générer l'URL Gravatar
function getGravatarUrl(email, size = 200) {
  const baseUrl = "https://www.gravatar.com/avatar/";
  const emailHash = md5(email.trim().toLowerCase());
  return `${baseUrl}${emailHash}?s=${size}&d=identicon`;
}

export default function LoginNativePage() {
  const [showPassword, setShowPassword] = useState(false); // Contrôle la visibilité du mot de passe
  const [formData, setFormData] = useState({ email: "", password: "" }); // Données du formulaire
  const [gravatarUrl, setGravatarUrl] = useState(null); // URL Gravatar
  const [error, setError] = useState(null); // Gestion des erreurs
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const router = useRouter(); // Initialiser le router

  // Met à jour les données du formulaire et l'URL Gravatar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      const gravatar = getGravatarUrl(value); // Génère l'URL Gravatar
      setGravatarUrl(gravatar);
    }
  };

  // Connexion avec email et mot de passe
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { email, password } = formData;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/"); // Rediriger vers la page principale
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Connexion avec Discord
  const handleDiscordLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
      });

      if (error) throw error;
    } catch (err) {
      console.error("Erreur lors de la connexion avec Discord :", err.message);
    }
  };

  // Connexion avec GitHub
  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) throw error;
    } catch (err) {
      console.error("Erreur lors de la connexion avec GitHub :", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-auto rounded-3xl font-FS_Sinclair h-screen">
      {/* Composant visuel pour l'effet d'arrière-plan */}
      <EvervaultCard className="absolute inset-0 rounded-3xl z-auto" />

      <div className="relative z-10 p-8 bg-white rounded-3xl shadow-md dark:bg-gray-800">
        {/* Formulaire de connexion */}
        <form onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold mb-6 dark:text-white font-FS_Sinclair">
            Login
          </h2>


          {/* Affichage de l'avatar Gravatar */}
          {formData.email && (
            <div className="flex justify-center mb-4">
              <img
                src={gravatarUrl}
                alt="Avatar Gravatar"
                className="w-16 h-16 rounded-full"
              />
            </div>
          )}

          {/* Champ d'email */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100 mb-4 font-FS_Sinclair"
          />



          {/* Champ de mot de passe */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Affiche le texte ou cache selon l'état
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-6 text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-600 font-FS_Sinclair"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        {/* Ligne de séparation ou texte optionnel */}
        <div className="my-6 text-center text-gray-500 dark:text-gray-400 font-FS_Sinclair">
          OR
        </div>

        {/* Bouton pour continuer avec Discord */}
        <button
          type="button"
          onClick={handleDiscordLogin}
          className="flex items-center justify-center w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 font-FS_Sinclair"
        >
          <span>
            <IconBrandDiscord className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          </span>
          Continue with Discord
        </button>

        {/* Bouton pour continuer avec GitHub */}
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="flex items-center justify-center w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 font-FS_Sinclair mt-4"
        >
          <span>
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          </span>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
