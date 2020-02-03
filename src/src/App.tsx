import React from 'react';
import './App.css';

import DialogTree from './Dialog/DialogTree';
import { AudioPlayer } from 'Audio';
import { AudioAssets } from 'Shared';
import { PrologueScene } from 'Scenes';

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

enum SceneState {
  START,
  PROLOGUE,
  END
}

interface IAppState {
  isLoading: boolean;
  sceneState: SceneState
}

class App extends React.PureComponent<{}, IAppState> {
  private rootRef = React.createRef<HTMLDivElement>();
  public state = {
    sceneState: SceneState.START,
    isLoading: true
  };

  async componentDidMount(): Promise<void> {
    if (this.rootRef.current == null) throw new Error('null audio ref');

    const players = await AudioPlayer.load(AudioAssets);
    players.forEach((p) => this.rootRef.current && this.rootRef.current.appendChild(p));

    this.setState({
      isLoading: false,
    });
  }

  render() {
    return (
      <div ref={this.rootRef} className="App">
        {this.state.isLoading && <div style={loadingStyle}>
          <span className='align-middle'>Loading</span></div>}
        {!this.state.isLoading && (
          this.getCurrentScene()
        )}
        {/* <DialogTree root={dialogTree} playerSpeaker="Player" /> */}
      </div>
    );
  }

  getCurrentScene(): JSX.Element {
    switch (this.state.sceneState) {
      case SceneState.END:
        return (<div style={loadingStyle}><span className='align-middle'>End.</span></div>);
      case SceneState.START:
        return (<div style={loadingStyle}>
          <h1 className="shadow-red">Grim Repair</h1><br />
          <div className="text-button" onClick={() => this.setState({
            sceneState: SceneState.PROLOGUE
          })}>Start</div></div>);
      default: return <PrologueScene onSceneEnd={() => this.setState({
        sceneState: SceneState.END
      })} />
    }
  }
}

export default App;
