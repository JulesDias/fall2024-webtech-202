"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stratagems from "../../../public/hd2ApiData/Stratagem.json"; // Importer les stratagèmes depuis le fichier JSON

export default function Train() {
    const [currentStratagem, setCurrentStratagem] = useState(null);
    const [playerInput, setPlayerInput] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        generateStratagem();
    }, []);

    const generateStratagem = () => {
        const randomStratagem = stratagems[Math.floor(Math.random() * stratagems.length)];
        setCurrentStratagem(randomStratagem);
        setPlayerInput([]);
        setFeedback("Ready!");
        setTimeTaken(0);
        if (timer) clearInterval(timer);

        const newTimer = setInterval(() => {
            setTimeTaken((prev) => prev + 0.01);
        }, 10);

        setTimer(newTimer);
    };

    const checkInput = () => {
        if (!currentStratagem) return;

        if (playerInput.join("") === currentStratagem.sequence.join("")) {
            setFeedback(`Success! Stratagem ${currentStratagem.name} activated.`);
            setScore(score + 1);
            clearInterval(timer);
            setTimeout(generateStratagem, 2000);
        } else if (playerInput.length === currentStratagem.sequence.length) {
            setFeedback("Failure! Try again.");
            setPlayerInput([]); // Réinitialisation de la séquence en cas d'échec
            clearInterval(timer);
            setTimeout(generateStratagem, 2000);
        }
    };

    const handleKeyDown = (event) => {
        const keyMap = {
            ArrowUp: "↑",
            ArrowDown: "↓",
            ArrowLeft: "←",
            ArrowRight: "→",
        };

        // Empêcher le défilement de la page si les flèches directionnelles sont pressées
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }

        if (keyMap[event.key]) {
            const direction = keyMap[event.key];
            const expected = currentStratagem.sequence[playerInput.length];
            setPlayerInput((prev) => [...prev, direction]);
        }
    };

    useEffect(() => {
        if (currentStratagem) {
            checkInput();
        }
    }, [playerInput]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    const getArrowColor = (index) => {
        if (index < playerInput.length) {
            const inputDirection = playerInput[index];
            const expectedDirection = currentStratagem.sequence[index];
            return inputDirection === expectedDirection ? "text-green-500" : "text-red-500";
        }
        return "text-gray-400"; // Couleur par défaut pour les flèches non encore entrées
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center font-FS_Sinclair min-h-screen overflow-hidden no-scrollbar">
            {currentStratagem && (
                <h1 className="text-6xl mb-10 text-yellow-400 drop-shadow-lg">Stratagem Training : {currentStratagem.name}</h1>
            )}

            {currentStratagem && (
                <>
                    <p className="text-3xl mb-8">
                        Execute the following sequence:
                        <span className="font-bold text-gray-400 ml-4">
                            {currentStratagem.sequence.map((arrow, index) => (
                                <span
                                    key={index}
                                    className={`arrow mx-4 text-5xl drop-shadow-lg ${getArrowColor(index)}`}
                                >
                                    {arrow}
                                </span>
                            ))}
                        </span>
                    </p>

                    {/* Affichage de l'image du stratagème */}
                    {currentStratagem.image && (
                        <img
                            src={currentStratagem.image}
                            alt={currentStratagem.name}
                            className="max-w-full h-auto mb-6"
                        />
                    )}

                    <p className="text-2xl mb-6">
                        Time Taken: <span className="font-bold text-red-400 drop-shadow-lg">{timeTaken.toFixed(2)}s</span>
                    </p>
                </>
            )}
            <AnimatePresence>
                <motion.p
                    key={feedback}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 text-2xl drop-shadow-lg"
                >
                    {feedback}
                </motion.p>
            </AnimatePresence>
            <p className="text-2xl mt-6">Score: {score}</p>
        </div>
    );
}
