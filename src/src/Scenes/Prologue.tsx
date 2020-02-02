import React from 'react';
import DialogTree from 'Dialog/DialogTree';
import { SceneProps } from './SceneProps';
import { IDialogTree } from '../Dialog/DialogTree';

const sceneEnd: IDialogTree = {
    dialog: [],
    responses: []
}

const bossNote: IDialogTree = {
    dialog: [{
        text: "I thought I’d seen it all, Grimm.",
        fromPlayer: false,
    },
    {
        text: "I’ve been on the job for thousands of years.",
        fromPlayer: false,
    },
    {
        text: "Thousands.",
        fromPlayer: false,
        className: 'italic'
    },
    {
        text: "of.",
        fromPlayer: false,
        className: 'italic'
    },
    {
        text: "years.",
        fromPlayer: false,
        className: 'italic'
    },
    {
        text: "Never have I seen a reaper kill the wrong human on their first job.",
        fromPlayer: false,
    },
    {
        text: "You lucked out this time, but get it right this time, Grimm.",
        fromPlayer: false,
    },
    {
        text: "...",
        fromPlayer: false,
    },
    {
        text: "Or else.",
        fromPlayer: false,
    }, {
        text: "Wait, what?",
        fromPlayer: true,
    },
    {
        text: "Lucked out?",
        fromPlayer: true,
    }],
    responses: [{
        text: "ALERT: MISSION UPDATE",
        fromPlayer: true,
        className: "bold",
        next: {
            dialog: [{
                text: "Reaper Mission Backlog:",
                className: 'italic',
                fromPlayer: false,
            },
            {
                text: "Name: Roux Grey",
                fromPlayer: false,
            },
            {
                text: "Time of death: XX PM, jan XX",
                fromPlayer: false,
            },
            {
                text: "Location of death: Home",
                fromPlayer: false,
            },
            {
                text: "Method of death: Too high a dose of diet teas",
                fromPlayer: false,
            },
            {
                text: "Reason: Under monthly quota for girls named “Roux”",
                fromPlayer: false,
            },
            {
                text: "Status: COMPLETE",
                fromPlayer: false,
            },
            {
                text: "So this human was supposed to die anyways? ",
                fromPlayer: true,
            }, {
                text: "So this human was supposed to die anyways? ",
                fromPlayer: true,
            }, {
                text: "Sweet! ",
                fromPlayer: true,
            }, {
                text: "I mean, not sweet... but I can save this,",
                fromPlayer: true,
            }, {
                text: "I just have to make sure I kill the right person. ",
                fromPlayer: true,
            }, {
                text: "Let’s take a final look:",
                fromPlayer: true,
            }, {
                text: "Well, that didn’t help.",
                fromPlayer: true,
            }, {
                text: "This is going to be harder than I thought. ",
                fromPlayer: true,
            }, {
                text: "Humans are so hard to tell apart.",
                fromPlayer: true,
            }],
            responses: [
                {
                    text: "Humans are so hard to tell apart.",
                    fromPlayer: true,
                    next: sceneEnd
                }
            ]
        }
    }]
}

const innerThoughtTree: IDialogTree = {
    dialog: [{
        text: "In all my years as a reaper, this has never happened before...",
        fromPlayer: true,
    },
    {
        text: "To be fair...",
        className: 'italic',
        fromPlayer: true,
    },
    {
        text: "I’ve only existed for three years.",
        fromPlayer: true,
    },
    {
        text: "Only been a full-fledged reaper for a week of that time.",
        fromPlayer: true,
    },
    {
        text: "I studied for years to do this, and I did the one thing they taught us never to do:",
        fromPlayer: true,
    },
    {
        text: "kill and reap the wrong soul.",
        fromPlayer: true,
    },
    {
        text: "Attached to the updated mission report is a note from my boss:",
        fromPlayer: true,
    }],
    responses: [{
        text: "Attached to the updated mission report is a note from my boss:",
        fromPlayer: true,
        next: bossNote
    }]
}

const nextCaseTree: IDialogTree = {
    dialog: [
        {
            text: "ALERT: MISSION UPDATE: Repair Requested",
            className: 'bold',
            fromPlayer: false,
        },
        {
            text: "Reaper Repair Request:",
            className: 'italic',
            fromPlayer: false,
        },
        {
            text: "Name: Jetson “Jett” Grey",
            fromPlayer: false,
        },
        {
            text: "Time of death: XX PM, Jan XX",
            fromPlayer: false,
        },
        {
            text: "Location of death: ??",
            fromPlayer: false,
        },
        {
            text: "Method of death:  ??",
            fromPlayer: false,
        },
        {
            text: "Reason: TBD",
            fromPlayer: false,
        },
        {
            text: "Description: TBD",
            fromPlayer: false,
        },
        {
            text: "Status: INCOMPLETE",
            fromPlayer: false,
        },
    ],
    responses: [
        {
            text: "...",
            fromPlayer: true,
            next: {
                dialog: [{ text: "Fuck.", fromPlayer: true }],
                responses: [{ text: "...", fromPlayer: true, next: innerThoughtTree }]
            }
        }
    ]
}

const rootTree: IDialogTree = {
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
        }],
    responses: [
        {
            text: "...",
            fromPlayer: true,
            next: nextCaseTree
        }
    ]
}

export interface PrologueSceneState {

}

export class PrologueScene extends React.Component<SceneProps<{}, {}>, PrologueSceneState> {

    componentDidMount() {
        this.props.onSceneStart && this.props.onSceneStart();
        sceneEnd.responses = [{
            text: "...",
            fromPlayer: true,
            next: () => { this.props.onSceneEnd(); }
        }];
    }

    render() {
        return (<>
            <DialogTree {...rootTree} />
        </>);
    }
}