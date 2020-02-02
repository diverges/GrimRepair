import React from 'react';
import Dialog from './Dialog';
import ChatBubble from './ChatBubble';

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
            dialogHistory: [],
        };
    }

    render() {
        return (
            <div className="chat-container">
                {this.state.dialogHistory.map(history => 
                    <ChatBubble {...history} />
                )}
                <Dialog
                    speaker={this.state.currentDialog.speaker}
                    dialog={this.state.currentDialog.dialog}
                    responses={this.state.currentDialog.responses.map(response => response.text)}
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
                    { speaker: this.state.currentDialog.speaker, dialog: this.state.currentDialog.dialog, fromPlayer: false, },
                    { speaker: this.props.playerSpeaker, dialog: response.text, fromPlayer: true },
                )
            });
        }
    }
}