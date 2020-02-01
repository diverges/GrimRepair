import React from 'react';
import './App.css';

import DialogTree from './Dialog/DialogTree';

let dialogTree = {
  speaker: "Grim Repear",
  dialog: "Are you p-repeared?",
  responses: [
    {
      text: "Pearfectly so.",
      next: {
        speaker: "Grim Repear",
        dialog: "Pearfect indeed.",
        responses: [],
      }
    },
    {
      text: "I am not prepeared.",
      next: () => alert("Game over."),
    }
  ],
}

const App = () => {
  return (
    <div className="App">
      <DialogTree {...dialogTree}/>
    </div>
  );
}

export default App;
