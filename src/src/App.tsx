import React from 'react';
import './App.css';

import DialogTree from './Dialog/DialogTree';
import { AudioPlayer } from 'Audio';
import { AudioAssets } from 'Shared';

let BossMan = "BossMan";
let Grimm = "Grimm";


let dialogTree = {
  dialog: [
    {
      speaker: BossMan,
      text: "Are you p-repeared?",
      fromPlayer: false,
    },
  ],
  responses: [
    {
      speaker: Grimm,
      text: "Pearfectly so.",
      fromPlayer: true,
      next: {
        dialog: [
          {
            speaker: BossMan,
            text: "Pearfect indeed.",
            fromPlayer: false,
          },
          {
            speaker: Grimm,
            text: "I see you have a pearchant for puns.",
            fromPlayer: true,
          }
        ],
        responses: [],
      }
    },
    {
      speaker: Grimm,
      text: "I am not prepeared.",
      fromPlayer: true,
      next: () => alert("Game over."),
    }
  ]
}

const loadingStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  display: 'table',
  zIndex: 9999,
  color: 'white',
  backgroundColor: 'black',
  fontSize: '20px',
  fontWeight: 'bold',
  height: '100%',
  width: '100%'
}

interface IAppState {
  isLoading: boolean;
}

class App extends React.PureComponent<{}, IAppState> {
  private rootRef = React.createRef<HTMLDivElement>();
  public state = {
    isLoading: false
  };

  async componentDidMount(): Promise<void> {
    if (this.rootRef.current == null) throw new Error('null audio ref');

    const players = await AudioPlayer.load(AudioAssets);
    players.forEach((p) =>
      this.rootRef && this.rootRef.current && this.rootRef.current.appendChild(p));

    this.setState({
      isLoading: false,
    });
  }

  render() {
    return (
      <div ref={this.rootRef} className="App">
        {this.state.isLoading && <div style={loadingStyle}><span className='align-middle'>Loading</span></div>}
        <DialogTree {...dialogTree} />
      </div>
    );
  }
}

export default App;
