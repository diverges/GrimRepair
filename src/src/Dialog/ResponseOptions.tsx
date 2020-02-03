import React from 'react';
import './Dialog.scss';
import { IResponse } from './DialogTree';

interface IResponseOptionsProps {
    responses: IResponse[],
    selectResponse: (index: number) => void,
}

const ResponseOptions = (props: IResponseOptionsProps) => {
    return (
        <div className="response-container">
            {props.responses.map((response, i) =>
                <div className="response" onClick={() => props.selectResponse(i)}>
                    <p className={response.className}>{response.text}</p>
                </div>
            )}
        </div>
    )
}

export default ResponseOptions;