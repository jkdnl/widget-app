import React from 'react';

interface Props {
    children: React.ReactNode
}

const TableRow: React.FC<Props> = ({children}) => {
    return (
        <tr className="border-b-2">
            {children}
        </tr>
    );
};

export default TableRow;