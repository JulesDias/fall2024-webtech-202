"use client";

import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import { IconBrandGithub, IconBrandDiscord } from "@tabler/icons-react";
import { supabase } from "../../lib/supabaseClient";
import md5 from "md5"; // Utilisé pour générer l'URL Gravatar

export function SignupFormDemo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=404`; // Retourne 404 si Gravatar n'existe pas
  };

  const getProfilePicture = async (provider) => {
    // Priorité 1 : Avatar de l'OAuth (GitHub/Discord)
    if (provider === "github" || provider === "discord") {
      const { user, error } = await supabase.auth.getUser();
      if (user && user.user_metadata && user.user_metadata.avatar_url) {
        return user.user_metadata.avatar_url;
      }
    }

    // Priorité 2 : Avatar Gravatar
    const gravatarUrl = getGravatarUrl(formData.email);
    try {
      const response = await fetch(gravatarUrl);
      if (response.ok) return gravatarUrl; // Si Gravatar existe, retourne l'URL
    } catch (err) {
      console.log("No Gravatar found.");
    }

    // Priorité 3 : Avatar par défaut
    return "/BasicImage.png"; // Une image par défaut dans le dossier public
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Obtenez l'avatar approprié
      const profilePicture = await getProfilePicture();

      // Inscrivez l'utilisateur avec l'avatar
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstname,
            last_name: formData.lastname,
            avatar_url: profilePicture,
          },
        },
      });

      if (error) throw error;
      alert("Signup successful! Check your email for a confirmation link.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;

      // Récupération de l'avatar après OAuth
      const profilePicture = await getProfilePicture(provider);
      // Mettez à jour la base de données de l'utilisateur
      const { user, error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: profilePicture },
      });
      if (updateError) throw updateError;
    } catch (err) {
      setError(`Login with ${provider} failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-300 dark:bg-gray-800">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 font-FS_Sinclair">
        JOIN THE DEMOCRATIC ARMY
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 font-FS_Sinclair">
        Sign Up to join the Helldivers forces!
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 font-FS_Sinclair">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Hell"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Divers"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4 font-FS_Sinclair">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="LovesuperEarth@ultramail.se"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 font-FS_Sinclair">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8 font-FS_Sinclair">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-input font-FS_Sinclair"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up →"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleOAuthLogin("github")}
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 font-FS_Sinclair"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
          </button>
          <button
            onClick={() => handleOAuthLogin("discord")}
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 font-FS_Sinclair"
            type="button"
          >
            <IconBrandDiscord className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Discord
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
