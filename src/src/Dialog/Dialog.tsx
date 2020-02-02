import React from 'react';
import './Dialog.css';
import ChatBubble from './ChatBubble';
import ResponseOptions from './ResponseOptions';

interface IDialogProps {
    speaker: string,
    dialog: string,
    responses: string[],
    selectResponse: (index: number) => void,
}

const Dialog = (props : IDialogProps) => {
    return (
        <div>
            <ChatBubble {...props} fromPlayer={false} />
            {props.responses && props.responses.length > 0 &&
                <ResponseOptions responses={props.responses} selectResponse={props.selectResponse} />
            }
        </div>
    )
}

export default Dialog;