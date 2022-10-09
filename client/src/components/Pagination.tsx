import React, {MouseEventHandler} from 'react';
import _ from "lodash"

interface PaginationProps {
    pageSize: number,
    count: number,
    onClick: (page: number) => void,
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({pageSize, count, onClick, currentPage}) => {

    const pageCount = Math.ceil(count/pageSize)
    if (pageCount === 0) return null
    const pages = _.range(1, pageCount + 1)

    if (pages.length <= 1) {
        return null
    }

    return (
        <nav className="flex my-4">
            <ul className="flex mx-auto">
                {
                    pages.map((page: number) => (
                        <li key={page} className={"mx-1 border-2 p-1 w-8 rounded text-center hover:cursor-pointer transition-all" + (page === currentPage ? " bg-blue-700 text-white" : "")}
                            onClick={() => onClick(page)}>
                            <button>{page}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Pagination;