import React from 'react';
import './Dialog.scss';

interface IDialogProps {
    speaker: string,
    text: string,
    fromPlayer: boolean,
}

const ChatBubble = (props : IDialogProps) => {
    return (
        <div className={props.fromPlayer ? 'chat-bubble-container-player' : 'chat-bubble-container-npc'}>
            <div className={props.fromPlayer ? 'chat-bubble-player' : 'chat-bubble-npc'}>
                <div>
                    <h2>{props.speaker}</h2>
                </div>
                <div>
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble;