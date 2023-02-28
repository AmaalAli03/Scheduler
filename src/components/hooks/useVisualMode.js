import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);

    setHistory(prev => {
      // we could do this with a ternary operator in one line
      // e.g. return replace ? ...  : ... 
      let newHistory = [...prev];
      if (replace) {
        newHistory.pop();
        // newHistory = newHistory.slice(0, -1);
        // setHistory(prev => [...prev.slice(0, history.length - 3)]);
      }

      return [...newHistory, newMode];
      // setHistory(prev => [...prev, newMode]);

    });
  };
  const back = () => {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
    setMode(history[history.length - 2]);
  };
  return { mode, transition, back, history };
}

