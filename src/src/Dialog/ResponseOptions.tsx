import React from 'react';
import './Dialog.css';

interface IResponseOptionsProps {
    responses: string[],
    selectResponse: (index: number) => void,
}

const ResponseOptions = (props : IResponseOptionsProps) => {
    return (
        <div className="ResponseOptions">
            {props.responses.map((response, i) =>
                <div className="Response" onClick={() => props.selectResponse(i)}>
                    <p>{response}</p>
                </div>
            )}
        </div>
    )
}

export default ResponseOptions;