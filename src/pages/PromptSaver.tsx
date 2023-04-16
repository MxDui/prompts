import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import browser from "webextension-polyfill";

interface Prompt {
  text: string;
  date: Date;
  llm: string;
}

function PromptSaver() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedLlm, setSelectedLlm] = useState("GPT-4");
  const [currentPrompt, setCurrentPrompt] = useState("");

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
    const newPrompt: Prompt = {
      text: promptText,
      date: new Date(),
      llm: selectedLlm,
    };
    const newPrompts = [...prompts, newPrompt];
    setPrompts(newPrompts);
    localStorage.setItem("prompts", JSON.stringify(newPrompts));
    form.reset();
  };

  const injectPrompt = (promptText: string) => {
    browser.tabs.executeScript({
      code: `document.querySelector('textarea').value = ${JSON.stringify(
        promptText
      )};`,
    });
  };

  const handleLlmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLlm(event.target.value);
  };

  return (
    <motion.div className="bg-gray-900 min-h-screen text-white ">
      <div className="container mx-auto p-20 ">
        <motion.form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 flex-col w-full form-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label className="text-lg font-medium flex-col flex items-center w-full">
            Enter an LLM prompt:
            <input
              type="text"
              name="promptText"
              className="ml-2 p-2 bg-gray-700 border border-gray-600 rounded text-white w-full"
            />
          </label>
          <label className="text-lg font-medium flex-col flex items-center w-full my-4">
            Select an LLM:
            <select
              value={selectedLlm}
              onChange={handleLlmChange}
              className="p-2 bg-gray-700 border border-gray-600 rounded text-white "
            >
              <option value="GPT-4">GPT-4</option>
              <option value="Llama">Llama</option>
              <option value="FLAN-T5">FLAN-T5</option>
              <option value="Claude">Claude</option>
              <option value="GPT-3.5">GPT-3</option>
            </select>
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="py-2 px-4 bg-blue-800 text-white rounded w-1/2"
          >
            Save Prompt
          </motion.button>
        </motion.form>
        <motion.table
          className="mt-6 w-full table-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Prompt</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">LLM</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((prompt: Prompt) => (
              <motion.tr
                key={prompt.date.toString()}
                className="bg-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <td className="border px-4 py-2">{prompt.text}</td>
                <td className="border px-4 py-2">
                  {prompt.date.toString().split("T")[0]}
                </td>
                <td className="border px-4 py-2">{prompt.llm}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => injectPrompt(prompt.text)}
                    className="py-1 px-3 bg-blue-800 text-white rounded"
                  >
                    Inject Prompt
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
}

export default PromptSaver;
