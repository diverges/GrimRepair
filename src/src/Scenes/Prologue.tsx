import React from 'react';
import DialogTree from 'Dialog/DialogTree';
import { SceneProps } from './SceneProps';

const BossMan = "";
let Grimm = "";

const caseFilesIntro = [
    {
        text: "ALERT: MISSION UPDATE",
        className: 'bold',
        fromPlayer: false,
    },
    {
        text: "Reaper Post-Report:",
        fromPlayer: false,
    },
    {
        text: "Name: Jettson Grey Roux Grey",
        fromPlayer: false,
    },
    {
        text: "Time of death: XX PM, Jan XX XX PM, JAN XX",
        fromPlayer: false,
    },
    {
        text: "Location of death: Home ??",
        fromPlayer: false,
    },
    {
        text: "Method of death: A bad acid trip Too high a dose of diet teas",
        fromPlayer: false,
    },
    {
        text: "Reason: General annoyingness Unknown",
        fromPlayer: false,
    },
]

const nextCaseTree = {
    dialog: [
        {
            text: "ALERT: MISSION UPDATE",
            className: 'bold',
            fromPlayer: false,
        },
        {
            text: "Reaper Post-Report:",
            fromPlayer: false,
        },
        {
            text: "Name: Jettson Grey Roux Grey",
            fromPlayer: false,
        },
        {
            text: "Time of death: XX PM, Jan XX XX PM, JAN XX",
            fromPlayer: false,
        },
        {
            text: "Location of death: Home ??",
            fromPlayer: false,
        },
        {
            text: "Method of death: A bad acid trip Too high a dose of diet teas",
            fromPlayer: false,
        },
        {
            text: "Reason: General annoyingness Unknown",
            fromPlayer: false,
        },
    ],
    responses: [
        {
            text: "...",
            fromPlayer: true,
            next: {}
        }
    ]
}

let dialogTree = {
    dialog: caseFilesIntro,
    responses: [
        {
            text: "...",
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
        }
    ]
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
            <DialogTree {...dialogTree} />
        </>);
    }
}