import React from 'react';
import Dialog from './Dialog';

interface IResponse {
    text: string,
    next: IDialogTreeProps | (() => void),
}

interface IDialogTreeProps {
    speaker: string,
    dialog: string,
    responses: IResponse[],
}

export default class DialogTree extends React.Component<IDialogTreeProps, IDialogTreeProps> {
    constructor(props: IDialogTreeProps) {
        super(props);
        
        this.state = props;
    }

    render() {
        return (
            <Dialog
                speaker={this.state.speaker}
                dialog={this.state.dialog}
                responses={this.state.responses.map(response => response.text)}
                selectResponse={(i) => this.onResponseSelection(i)} />
        )
    }

    onResponseSelection(index: number) {
        let response = this.state.responses[index];
        
        if (typeof(response.next) === 'function') {
            response.next();
        }
        else {
            this.setState(response.next);
        }
    }
}