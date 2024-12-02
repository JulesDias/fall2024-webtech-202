"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupère l'utilisateur actuel
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { user_metadata } = session.user;
        // Si l'utilisateur est connecté via email, utilise la première partie de l'email comme nom
        const name = user_metadata?.name || session.user.email.split("@")[0];
        setUser({
          ...session.user,
          name: name,
          avatar_url: user_metadata?.avatar_url || "/BasicImage.png", // Photo de profil ou image par défaut
        });
      } else {
        setUser(null);
      }
    };

    getUser();

    // Écoute les changements de session
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const { user_metadata } = session.user;
        const name = user_metadata?.name || session.user.email.split("@")[0];
        setUser({
          ...session.user,
          name: name,
          avatar_url: user_metadata?.avatar_url || "/BasicImage.png", // Photo de profil ou image par défaut
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      console.error("Erreur lors de la connexion :", error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
