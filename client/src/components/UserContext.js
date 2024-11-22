"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Charger l'utilisateur depuis le stockage local au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Charger l'utilisateur stocké
    }
  }, []);

  // Fonction de connexion personnalisée
  const login = async (email, password) => {
    try {
      // Requête à votre base de données pour vérifier les identifiants
      const response = await fetch("../../app/api/login/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Erreur de connexion");
      }

      // Stocker l'utilisateur connecté dans le contexte et le localStorage
      const { user } = result; // Supposons que l'API renvoie un objet utilisateur
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      return false;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Supprimer les données utilisateur du stockage local
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
