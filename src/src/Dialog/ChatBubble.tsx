import React from 'react';
import './Dialog.scss';
import { AudioPlayer } from '../Audio/GameAudio';

interface IDialogProps {
    speaker?: string,
    className?: string,
    text: string,
    fromPlayer: boolean,
}

const ChatBubble = (props: IDialogProps) => {
    AudioPlayer.play('PHONE_CORD_2');
    return (
        <div className={props.fromPlayer ? 'chat-bubble-container-player' : 'chat-bubble-container-npc'}>
            <div className={props.fromPlayer ? 'chat-bubble-player' : 'chat-bubble-npc'}>
                {props.speaker && <div>
                    <h2>{props.speaker}</h2>
                </div>
                }
                <div>
                    <p className={props.className}>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble;