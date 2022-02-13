import React, { useState, useEffect } from "react";

import Phase from "./components/Phase";
import { INITIAL_PROGRESS_DATA } from "./data";

function App() {
  const storedData = localStorage.getItem("progressData");
  const [progressData, setProgressData] = useState(
    storedData ? JSON.parse(storedData) : INITIAL_PROGRESS_DATA
  );
  const [randomFact, setRandomFact] = useState();
  const [isAllStepsFinished, setIsAllStepsFinished] = useState(
    getPhasesStatus(progressData)
  );

  function getPhasesStatus(data) {
    return data
      .map((i) => i.items)
      .flat()
      .every((i) => i.isChecked);
  }

  function onItemChange(phaseIdx, itemIdx, isChecked) {
    const isPrevPhaseFinished =
      phaseIdx === 0
        ? true
        : progressData[phaseIdx - 1].items.every((i) => i.isChecked);

    if (!isPrevPhaseFinished && isChecked) return;

    progressData[phaseIdx].items[itemIdx].isChecked = isChecked;
    setProgressData([...progressData]);
    localStorage.setItem("progressData", JSON.stringify(progressData));
  }

  async function fetchRandomFact() {
    let randomFact;

    try {
      randomFact = await fetch("https://uselessfacts.jsph.pl/random.json");
      randomFact = (await randomFact.json()).text;
    } catch (e) {
      console.log("Error on random fact fetch", e);
      return;
    }

    setRandomFact(randomFact);
  }

  useEffect(() => {
    fetchRandomFact();
  }, []);

  useEffect(() => {
    setIsAllStepsFinished(getPhasesStatus(progressData));
  }, [progressData]);

  return (
    <div className="App p-8">
      <h1 className="text-xl font-bold">My startup progress 🚀</h1>

      <div className="mt-8 w-96">
        {progressData.map((i, idx) => (
          <Phase key={i.title} idx={idx} data={i} onChange={onItemChange} />
        ))}
      </div>

      {randomFact && isAllStepsFinished && (
        <div className="mt-8">
          <p className="font-bold">Nice job! Here's a random fact for you 👀</p>
          <p>"{randomFact}"</p>
        </div>
      )}
    </div>
  );
}

export default App;
