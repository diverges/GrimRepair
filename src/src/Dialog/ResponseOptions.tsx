import React from 'react';
import './Dialog.scss';

interface IResponseOptionsProps {
    responses: string[],
    selectResponse: (index: number) => void,
}

const ResponseOptions = (props : IResponseOptionsProps) => {
    return (
        <div className="response-container">
            {props.responses.map((response, i) =>
                <div className="response" onClick={() => props.selectResponse(i)}>
                    <p>{response}</p>
                </div>
            )}
        </div>
    )
}

export default ResponseOptions;