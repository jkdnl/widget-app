import React from 'react';
import TableRow from "./TableRow";
import IData from "../../models/IData";
import TableCell from "./TableCell";

interface TableProps {
    data: IData[]
}

const Table: React.FC<TableProps> = ({data}) => {

    return (
        <table className="w-full">
            <thead>
                <TableRow>
                    <TableCell isHeader={true}>Date</TableCell>
                    <TableCell isHeader={true}>Name</TableCell>
                    <TableCell isHeader={true}>Quantity</TableCell>
                    <TableCell isHeader={true}>Distance (m)</TableCell>
                </TableRow>
            </thead>
            <tbody>
            {
                data.map(item => (
                    <TableRow key={item._id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.distance}</TableCell>
                    </TableRow>
                ))
            }
            </tbody>
        </table>
    );
};

export default Table;