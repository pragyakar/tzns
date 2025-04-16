import "./App.css";
import React, { useState } from "react";

import SchedulingAssistant from "./components/SchedulingAssistant";
import TimezoneDisplay from "./components/TimezoneDisplay";

export const App = () => {
  const [baseTime, setBaseTime] = useState(new Date().toUTCString());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <p className="tzns-logo">tzns</p>
        <TimezoneDisplay baseTime={baseTime} />
      </header>
      <button className="floating-cta" onClick={openModal}>
        📅
      </button>
      {isModalOpen && (
        <SchedulingAssistant onClose={closeModal} setBaseTime={setBaseTime} />
      )}
    </div>
  );
};

export default App;
