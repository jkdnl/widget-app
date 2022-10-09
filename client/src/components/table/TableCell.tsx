import React from 'react';

interface Props {
    children: React.ReactNode,
    isHeader?: boolean
}

const TableCell: React.FC<Props> = ({children, isHeader = false}) => {
    if (isHeader) {
        return (
            <th className="text-left p-4">
                {children}
            </th>
        )
    }
    return (
        <td className="p-4 text-left">
            {children}
        </td>
    );
};

export default TableCell;