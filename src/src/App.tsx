import React from 'react';
import './App.css';

import { AudioPlayer } from 'Audio';
import { AudioAssets } from 'Shared';
import { PrologueScene } from 'Scenes';

import title from 'assets/title.png';
import bg from 'assets/bg.png';

const loadingStyle: React.CSSProperties = {
  backgroundImage: `url(${bg})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '400px',
  position: 'fixed',
  top: '0',
  display: 'table',
  zIndex: 9999,
  color: 'white',
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
          <img src={title} className="center" style={{
            maxWidth: '350px',
            padding: '20px'
          }} />
          <div className="text-button" style={{ fontSize: '48px' }} onClick={() => this.setState({
            sceneState: SceneState.PROLOGUE
          })}>Start</div></div>);
      default: return <PrologueScene onSceneEnd={() => this.setState({
        sceneState: SceneState.END
      })} />
    }
  }
}

export default App;
