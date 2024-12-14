"use client";
import { useState, useEffect } from 'react';

export default function NewsTicker() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupère les messages de l'API au chargement du composant
    async function fetchNews() {
      try {
        const response = await fetch('https://helldiverstrainingmanual.com/api/v1/war/news');
        const data = await response.json();
        setNews(data.map(item => item.message)); // Récupérer uniquement les messages
      } catch (err) {
        setError('Failed to load news feed');
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="text-black py-2 overflow-hidden whitespace-nowrap font-FS_Sinclair relative">
      <div className="animate-marquee flex">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          [...news, ...news].map((message, index) => (  // double le contenu pour l'illusion de continuité
            <span key={index} className="mx-24">{message}</span> // Espace agrandi entre les messages
          ))
        )}
      </div>
    </div>
  );
}
