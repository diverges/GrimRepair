import React from 'react';
import ChatBubble from './ChatBubble';
import ResponseOptions from './ResponseOptions';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

export interface IDialog {
    speaker?: string,
    className?: string,
    text: string,
    fromPlayer: boolean,
    delay?: number
}

interface IResponse extends IDialog {
    next: IDialogTree | (() => void),
}

export interface IDialogTree {
    dialog: IDialog[],
    responses: IResponse[],
}

interface IState {
    dialogHistory: IDialog[],
    currentResponses: IResponse[]
}

const messageDelay = 2000;

export default class DialogTree extends React.Component<IDialogTree, IState> {
    constructor(props: IDialogTree) {
        super(props);

        this.state = {
            dialogHistory: [],
            currentResponses: [],
        };

        this.showAllDialogThenResponses(props.dialog, props.responses);
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chat-history">
                    {this.state.dialogHistory.map((history, i) =>
                        <ChatBubble {...history} />
                    )}
                </div>
                <ResponseOptions
                    responses={this.state.currentResponses.map(r => r.text)}
                    selectResponse={(i) => this.onResponseSelection(i)} />
            </div>
        )
    }

    onResponseSelection(index: number) {
        let response = this.state.currentResponses[index];

        if (typeof (response.next) === 'function') {
            response.next();
        }
        else {
            this.setState({
                currentResponses: [],
                dialogHistory: this.state.dialogHistory.concat({ speaker: response.speaker, text: response.text, fromPlayer: true })
            });


            this.showAllDialogThenResponses(response.next.dialog, response.next.responses);
        }
    }

    showAllDialogThenResponses(dialog: IDialog[], responses: IResponse[]) {
        const showAllDialogWithDelays = dialog.reduce((promise, dialog) => promise.then(() => {
            this.setState({
                dialogHistory: this.state.dialogHistory.concat(dialog),
            });

            return this.delay(dialog.delay || messageDelay);
        }), this.delay(messageDelay))

        showAllDialogWithDelays.then(() => {
            this.setState({
                currentResponses: responses,
            });
        });
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}