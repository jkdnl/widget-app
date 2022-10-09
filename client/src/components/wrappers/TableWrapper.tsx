import React from 'react';

interface Props {
    children: React.ReactNode
}

const TableWrapper: React.FC<Props> = ({children}) => {
    return (
        <div className="md:w-2/3 mx-auto p-2">
            {children}
        </div>
    );
};

export default TableWrapper;