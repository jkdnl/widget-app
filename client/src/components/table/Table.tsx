import React from 'react';
import TableRow from "./TableRow";
import IData from "../../models/IData";
import TableCell from "./TableCell";
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md";

interface TableProps {
    data: IData[],
    sortHandler: (sortItem: string) => void,
    order: {iter: string, order: "asc" | "desc" | boolean}
}

const Table: React.FC<TableProps> = ({data, sortHandler, order}) => {

    return (
        <table className="w-full">
            <thead>
                <TableRow>
                    <th className="py-4">Date</th>
                    <th className="items-center hover:cursor-pointer" onClick={() => sortHandler("name")}>
                        Name
                        {
                            (order.order === "asc" && order.iter === "name")
                                ? (
                                    <MdArrowDropUp className="w-6 aspect-square mx-auto"/>
                                )
                                : (
                                    <MdArrowDropDown className="w-6 aspect-square mx-auto"/>
                                )
                        }
                    </th>
                    <th className="items-center hover:cursor-pointer" onClick={() => sortHandler("quantity")}>
                        <p>Quantity</p>
                        {
                            (order.order === "asc" && order.iter === "quantity")
                                ? (
                                    <MdArrowDropUp className="w-6 aspect-square mx-auto"/>
                                )
                                : (
                                    <MdArrowDropDown className="w-6 aspect-square mx-auto"/>
                                )
                        }
                    </th>
                    <th className="items-center hover:cursor-pointer" onClick={() => sortHandler("distance")}>
                        <p>Distance</p>
                        {
                            (order.order === "asc" && order.iter === "distance")
                                ? (
                                    <MdArrowDropUp className="w-6 aspect-square mx-auto"/>
                                )
                                : (
                                    <MdArrowDropDown className="w-6 aspect-square mx-auto"/>
                                )
                        }
                    </th>
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