import React, {useEffect, useState} from 'react';
import Table from "../components/table/Table";
import TableWrapper from "../components/wrappers/TableWrapper";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchData} from "../store/actions/dataActions";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import Pagination from "../components/Pagination";
import IData from "../models/IData";

const MainPage = () => {

    // Fetching the data
    const {data, loading, error} = useAppSelector(state => state.dataReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [])

    // Calculating the number of pages
    const count = data.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageChangeHandler = (page: number) => {
        setCurrentPage(page)
    }

    // Cropping data
    const paginate = (data: IData[], pageNumber: number, pageSize: number) => {
        const start = (pageNumber - 1) * pageSize
        return [...data].splice(start, pageSize)
    }
    const croppedData = paginate(data, currentPage, pageSize)

    return (
        <TableWrapper>
            {
                loading && <Loader />
            }
            {
                error && <Error error={error} />
            }
            {
                data && !loading && !error && <Table data={croppedData} />
            }
        <Pagination pageSize={pageSize} count={count} onClick={pageChangeHandler} currentPage={currentPage} />
        </TableWrapper>
    );
};

export default MainPage