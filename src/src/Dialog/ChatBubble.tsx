import React from 'react';
import './Dialog.css';

interface IDialogProps {
    speaker: string,
    dialog: string,
    fromPlayer: boolean,
}

const ChatBubble = (props : IDialogProps) => {
    return (
        <div className={'ChatBubbleContainer' + (props.fromPlayer ? ' ChatBubbleContainer-Player' : '')}>
            <div className={'ChatBubble' + (props.fromPlayer ? ' ChatBubble-Player' : '')}>
                <div className="Speaker">
                    <h2>{props.speaker}</h2>
                </div>
                <div className="Dialog">
                    <p>{props.dialog}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble;