import React from 'react';
import ChatBubble from './ChatBubble';
import ResponseOptions from './ResponseOptions';

interface IResponse {
    text: string,
    next: IDialogTree | (() => void),
}

interface IDialogTree {
    speaker: string,
    dialog: string,
    responses: IResponse[],
}

interface IHistoricDialog {
    speaker: string,
    dialog: string,
    fromPlayer: boolean,
}

interface IDialogTreeProps {
    playerSpeaker: string,
    root: IDialogTree,
}

interface IState {
    currentDialog: IDialogTree,
    dialogHistory: IHistoricDialog[],
}

export default class DialogTree extends React.Component<IDialogTreeProps, IState> {
    constructor(props: IDialogTreeProps) {
        super(props);
        
        this.state = {
            currentDialog: props.root,
            dialogHistory: [{ ...props.root, fromPlayer: false }],
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
        
        if (typeof(response.next) === 'function') {
            response.next();
        }
        else {
            this.setState({
                currentDialog: response.next,
                dialogHistory: this.state.dialogHistory.concat(
                    { speaker: this.props.playerSpeaker, dialog: response.text, fromPlayer: true },
                    { speaker: response.next.speaker, dialog: response.next.dialog, fromPlayer: false, },
                )
            });
        }
    }
}