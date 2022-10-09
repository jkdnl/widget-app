import React from 'react';

interface Props {
    children: React.ReactNode,
}

const TableCell: React.FC<Props> = ({children}) => {
    return (
        <td className="p-4 text-center">
            {children}
        </td>
    );
};

export default TableCell;