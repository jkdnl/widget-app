import React from 'react';

interface Props {
    error: string
}

const Error: React.FC<Props> = ({error}) => {
    return (
        <div className="text-lg text-red-600 text-center mt-4">
            <p>
                {error}
            </p>
            <p>
                Please, try again later
            </p>
        </div>
    );
};

export default Error;