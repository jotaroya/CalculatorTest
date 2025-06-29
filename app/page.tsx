'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", "C", "=", "+"
  ];

  const isOperator = (char: string) => ["+", "-", "×", "÷"].includes(char);

  const handleClick = (value: string) => {
    if (value === "C") {
      setInput("");
    } else if (input[0] == "E" || input[0] == "I" || input[0] == "f") {
      setInput("");
      if (isOperator(value) || value == "=") {
        setInput("");
      } else {
        setInput(value);
      }
    } else if (isOperator(value)) {
      const last = input.slice(-1);
      if (isOperator(last)) {
        setInput(input.slice(0, -1) + value);
      } else {
        setInput(input + value);
      }
    } else if (value === "=") {
      try {
        const replaced = input.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(replaced);
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Calculator</h1>

        {/* 表示画面 */}
        <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-right p-4 mb-4 rounded text-xl min-h-[3rem]">
          {input || "0"}
        </div>

        {/* ボタンエリア */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => {
            const isSpecial = btn === "=" || btn === "C";
            const baseClass = "text-xl py-4 rounded transition-colors";
            const colorClass = isSpecial
              ? btn === "="
                ? "bg-amber-500 hover:bg-amber-400 text-white"
                : "bg-red-500 hover:bg-red-400 text-white"
              : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-black dark:text-white";

            return (
              <button
                key={btn}
                className={`${baseClass} ${colorClass}`}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
