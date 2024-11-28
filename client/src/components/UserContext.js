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
        setUser({
          ...session.user,
          name: user_metadata?.name || session.user.email.split("@")[0], // Utilise le nom ou une partie de l'email comme fallback
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
        setUser({
          ...session.user,
          name: user_metadata?.name || session.user.email.split("@")[0],
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
