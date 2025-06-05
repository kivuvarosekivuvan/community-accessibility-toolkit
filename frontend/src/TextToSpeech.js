// src/components/TextToSpeech.js

import React, { useState } from 'react';

const TextToSpeech = ({ text }) => {
  const [speech, setSpeech] = useState(null);

  // Initialize speech synthesis
  const initializeSpeech = () => {
    const speechInstance = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setSpeech(null);
    };
    setSpeech(utterance);
    speechInstance.speak(utterance);
  };

  return (
    <div>
      <button onClick={initializeSpeech} disabled={!text}>
        Read Aloud
      </button>
    </div>
  );
};

export default TextToSpeech;