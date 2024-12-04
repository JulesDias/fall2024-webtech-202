"use client";

import { useUser } from "../../components/UserContext";

export default function Profile() {
    const { user, logout } = useUser();

    // Si aucun utilisateur n'est connecté
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-gray-800 dark:text-gray-200">
                <h1 className="text-2xl font-semibold">Aucun utilisateur connecté</h1>
                <p className="mt-2">Connectez-vous pour accéder à votre profil.</p>
            </div>
        );
    }

    return (

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-96">
            {/* Photo de profil */}
            <div className="flex justify-center mb-6">
                <img
                    src={user.avatar_url}
                    alt="Photo de profil"
                    className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover"
                />
            </div>
            {/* Informations utilisateur */}
            <h2 className="text-xl font-semibold text-center">{user.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">{user.email}</p>
            <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>ID utilisateur :</strong> {user.id}
                </p>
                {user.aud && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <strong>Audience :</strong> {user.aud}
                    </p>
                )}
            </div>
            {/* Bouton de déconnexion */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                >
                    Déconnexion

                </button>
            </div>
        </div>

    );
}
