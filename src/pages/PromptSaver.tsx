// PromptSaver.js

import React, { useState, useEffect } from "react";

function PromptSaver() {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const savedPrompts = localStorage.getItem("prompts");
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    }
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const promptText = event.target.promptText.value;
    const newPrompt = { text: promptText, date: new Date() };
    const newPrompts = [...prompts, newPrompt];
    setPrompts(newPrompts);
    localStorage.setItem("prompts", JSON.stringify(newPrompts));
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a GPT prompt:
          <input type="text" name="promptText" />
        </label>
        <button type="submit">Save Prompt</button>
      </form>
      <ul>
        {prompts.map((prompt: { date: any; text: any }) => (
          <li key={prompt.date}>{prompt.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default PromptSaver;
