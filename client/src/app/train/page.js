"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stratagems from "../../../public/hd2ApiData/Stratagem.json";
import { TbArrowBigDown, TbArrowBigUp, TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";

// Fonction pour mapper la valeur de la séquence avec les icônes correspondantes
const arrowIconMap = {
    "↑": <TbArrowBigUp className="text-5xl" />,
    "↓": <TbArrowBigDown className="text-5xl" />,
    "←": <TbArrowBigLeft className="text-5xl" />,
    "→": <TbArrowBigRight className="text-5xl" />,
};

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
            setPlayerInput([]);
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

        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }

        if (keyMap[event.key]) {
            setPlayerInput((prev) => [...prev, keyMap[event.key]]);
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
    }, []);

    const getArrowColor = (index) => {
        if (index < playerInput.length) {
            const inputDirection = playerInput[index];
            const expectedDirection = currentStratagem.sequence[index];
            return inputDirection === expectedDirection ? "text-green-500" : "text-red-500";
        }
        return "text-gray-400";
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center font-FS_Sinclair min-h-screen overflow-hidden no-scrollbar">
            {currentStratagem && (
                <h1 className="text-6xl mb-10 text-yellow-400 drop-shadow-lg">Stratagem Training : {currentStratagem.name}</h1>
            )}

            {currentStratagem && (
                <>
                    <div className="text-3xl mb-8">
                        Execute the following sequence:
                        <div className="flex justify-center items-center space-x-4 font-bold text-gray-400 ml-4">
                            {currentStratagem.sequence.map((arrow, index) => (
                                <span
                                    key={index}
                                    className={`arrow ${getArrowColor(index)}`}
                                >
                                    {arrowIconMap[arrow] || arrow}
                                </span>
                            ))}
                        </div>
                    </div>


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
