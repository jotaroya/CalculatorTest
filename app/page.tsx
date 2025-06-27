'use client'; // ← App RouterではUI操作がある時は必須

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
  } else if (input[0] == "E" || input[0] == "I" || input[0] == "f"){
    setInput("");
    // alert("E,I,fを検知")
    if (isOperator(value) || value == "=") {
    setInput("");
    } else {
    setInput(value);
    }
  } else if (isOperator(value)) { 
    const last = input.slice(-1);
    if (isOperator(last)) {
      // 元々の最後が演算子→最後を書き換える
      setInput(input.slice(0, -1) + value);
    } else {
      setInput(input + value);
    }
  }
  else if (value === "=") {
    try {
      const replaced = input.replace(/×/g, "*").replace(/÷/g, "/");
      const result = eval(replaced); // JavaScriptの式として実行
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  } else {
    setInput((prev) => prev + value);
  }
  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Calculator</h1>

        {/* 表示画面 */}
        <div className="bg-gray-100 text-right p-4 mb-4 rounded text-xl min-h-[3rem]">
          {input || "0"}
        </div>

        {/* ボタンエリア */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <button
              key={btn}
              className="bg-gray-200 hover:bg-gray-300 text-xl py-4 rounded"
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}