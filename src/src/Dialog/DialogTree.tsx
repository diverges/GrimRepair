import React from 'react';
import ChatBubble from './ChatBubble';
import ResponseOptions from './ResponseOptions';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

interface IDialog {
    speaker?: string,
    className?: string,
    text: string,
    fromPlayer: boolean,
}

interface IResponse extends IDialog {
    next: IDialogTree | (() => void),
}

interface IDialogTree {
    dialog: IDialog[],
    responses: IResponse[],
}

interface IState {
    currentDialog: IDialogTree,
    dialogHistory: IDialog[],
}

export default class DialogTree extends React.Component<IDialogTree, IState> {
    constructor(props: IDialogTree) {
        super(props);

        this.state = {
            currentDialog: props,
            dialogHistory: props.dialog,
        };
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
                    responses={this.state.currentDialog.responses.map(r => r.text)}
                    selectResponse={(i) => this.onResponseSelection(i)} />
            </div>
        )
    }

    onResponseSelection(index: number) {
        let response = this.state.currentDialog.responses[index];

        if (typeof (response.next) === 'function') {
            response.next();
        }
        else {
            this.setState({
                currentDialog: response.next,
                dialogHistory: this.state.dialogHistory
                    .concat({ speaker: response.speaker, text: response.text, fromPlayer: true })
                    .concat(response.next.dialog),
            });
        }
    }
}