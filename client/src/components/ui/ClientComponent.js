"use client";

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [planetNames, setPlanetNames] = useState([]);

  useEffect(() => {
    // Charger les noms des planètes depuis le fichier JSON
    async function loadPlanetNames() {
      try {
        const response = await fetch('/apiPlanetName.json');
        const planetData = await response.json();
        setPlanetNames(planetData.planetNames);
      } catch (err) {
        setError('Failed to load planet names');
      }
    }

    loadPlanetNames();

    // Charger les autres données comme précédemment
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/war'); 
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Planet Status</h1>
  
      {data ? (
        <div>
          <div>
            <h2>War ID</h2>
            <p>{data.warId}</p>
          </div>
          <div>
            <h2>Time</h2>
            <p>{data.time}</p>
          </div>
          <div>
            <h2>Impact Multiplier</h2>
            <p>{data.impactMultiplier}</p>
          </div>
  
          <h2>Planets</h2>
          {data.planetStatus && data.planetStatus.length > 0 ? (
            <div className="flex flex-wrap">
              {data.planetStatus
                .filter(planet => planet.players > 0) // Filtrer les planètes sans joueurs
                .map((planet, index) => (
                  <div
                    key={index}
                    style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      marginBottom: '10px',
                      marginRight: '10px', // Espacement entre les cartes
                      flex: '1 1 calc(12.5% - 10px)', // Chaque carte prend un tiers de l'espace
                      boxSizing: 'border-box',
                    }}
                  >
                    <div>
                      {/* Afficher d'abord le nom de la planète */}
                      <h3>{planetNames[planet.index]}</h3>
                    </div>
  
                    {/* Ensuite, affichez les autres données de la planète */}
                    <div>
                      <h4>Index</h4>
                      <p>{planet.index}</p>
                    </div>
                    <div>
                      <h4>Owner</h4>
                      <p>{planet.owner}</p>
                    </div>
                    <div>
                      <h4>Health</h4>
                      <p>{planet.health}</p>
                    </div>
                    <div>
                      <h4>Regen per Second</h4>
                      <p>{planet.regenPerSecond}</p>
                    </div>
                    <div>
                      <h4>Players</h4>
                      <p>{planet.players}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p>No planet data available</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
