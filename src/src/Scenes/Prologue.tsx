import React from 'react';
import DialogTree from 'Dialog/DialogTree';
import { SceneProps } from './SceneProps';

const dialogTree = {
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

export interface PrologueSceneState {

}

export class PrologueScene extends React.Component<SceneProps<{}, {}>, PrologueSceneState> {

    componentDidMount() {
        this.props.onSceneStart && this.props.onSceneStart();
    }

    componentWillUnmount() {
        this.props.onSceneEnd && this.props.onSceneEnd();
    }

    render() {
        return (<>
            <DialogTree root={dialogTree} playerSpeaker="Player" />
        </>);
    }
}