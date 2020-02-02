import React from 'react';
import './App.css';

import DialogTree from './Dialog/DialogTree';
import { AudioPlayer } from 'Audio';
import { AudioAssets } from 'Shared';

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
        <DialogTree root={dialogTree} playerSpeaker="Player" />
      </div>
    );
  }
}

export default App;
