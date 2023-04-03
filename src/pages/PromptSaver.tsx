import React, { useState, useEffect, FormEvent } from "react";

interface Prompt {
  text: string;
  date: Date;
}

function PromptSaver() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const savedPrompts = localStorage.getItem("prompts");
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const promptText = form.promptText.value;
    const newPrompt: Prompt = { text: promptText, date: new Date() };
    const newPrompts = [...prompts, newPrompt];
    setPrompts(newPrompts);
    localStorage.setItem("prompts", JSON.stringify(newPrompts));
    form.reset();
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <label className="text-lg font-medium">
            Enter a GPT prompt:
            <input
              type="text"
              name="promptText"
              className="ml-2 p-2 border border-gray-300 rounded"
            />
          </label>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Save Prompt
          </button>
        </form>
        <table className="mt-6 w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Prompt</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">LLM</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((prompt: Prompt) => (
              <tr key={prompt.date.toString()} className="bg-white">
                <td className="border px-4 py-2">{prompt.text}</td>
                <td className="border px-4 py-2">
                  {prompt.date.toString().split("T")[0]}
                </td>
                <td className="border px-4 py-2">GPT-4</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PromptSaver;
