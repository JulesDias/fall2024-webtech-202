"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Création du contexte
const UserContext = createContext();

// Composant Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Initialiser l'utilisateur avec la session actuelle
  const initializeUser = (userSession) => {
    const { email, id, user_metadata } = userSession;
    const name = user_metadata?.name || email.split("@")[0];
    const avatarUrl = user_metadata?.avatar_url || "/BasicImage.png";
    setUser({ ...userSession, name, avatar_url: avatarUrl });
  };

  // Fonction pour vérifier et insérer l'utilisateur dans la base de données si nécessaire
  const checkAndInsertUser = async (userSession) => {
    const { email, id, user_metadata } = userSession;
    const name = user_metadata?.name || email.split("@")[0];
    const avatarUrl = user_metadata?.avatar_url || "/BasicImage.png";

    // Vérification de l'existence de l'utilisateur dans la base de données
    const { data, error } = await supabase
      .from("my_users")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Erreur lors de la recherche dans my_users :", error.message);
      return;
    }

    // Si l'utilisateur n'existe pas, on l'ajoute
    if (!data) {
      const { error: insertError } = await supabase.from("my_users").insert([
        {
          id,
          email,
          avatar_url: avatarUrl,
          created_at: new Date(),
          name,
        },
      ]);
      if (insertError) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", insertError.message);
      }
    }
  };

  // Fonction pour récupérer la session de l'utilisateur
  const getUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      initializeUser(session.user);
      await checkAndInsertUser(session.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Récupérer la session initiale au montage
    getUserSession();

    // Souscrire aux changements de session d'authentification
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        initializeUser(session.user);
        checkAndInsertUser(session.user);
      } else {
        setUser(null);
      }
    });

    // Nettoyage de la souscription lors du démontage du composant
    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []); // Ce useEffect se lance une seule fois lors du montage du composant

  // Fonction de connexion avec un fournisseur OAuth
  const login = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      console.error("Erreur lors de la connexion :", error.message);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
    setUser(null); // On réinitialise l'état de l'utilisateur après déconnexion
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook pour utiliser le contexte de l'utilisateur
export const useUser = () => {
  return useContext(UserContext);
};
