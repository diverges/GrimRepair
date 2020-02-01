import React from 'react';
import './Dialog.css';

interface IDialogProps {
    speaker: string,
    dialog: string,
    responses: string[],
    selectResponse: (index: number) => void,
}

const Dialog = (props : IDialogProps) => {
    return (
        <div className="DialogBox">
            <h1 className="Speaker">{props.speaker}</h1>
            <div className="Dialog">
                <p>{props.dialog}</p>
            </div>
            {props.responses && props.responses.length > 0 &&
                <div className="ResponseOptions">
                    <ul>
                        {props.responses.map((response, i) => 
                            <li className="ResponseOption" onClick={() => props.selectResponse(i)}>
                                {response}
                            </li>)}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Dialog;