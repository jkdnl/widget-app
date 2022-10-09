import React, {useEffect, useState} from 'react';
import Table from "../components/table/Table";
import TableWrapper from "../components/wrappers/TableWrapper";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchData} from "../store/actions/dataActions";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import Pagination from "../components/Pagination";
import IData from "../models/IData";
import {orderBy} from "lodash";
import TextField from "../components/TextField";
import useInput from "../hooks/useInput";

const MainPage = () => {

    // Fetching the data
    const {data, loading, error} = useAppSelector(state => state.dataReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])


    // Sorting Data
    const [sortBy, setSortBy] = useState<{iter: string, order: "asc" | "desc" | boolean}>({iter: "", order: false})
    const sortedData = orderBy(data, [sortBy.iter], [sortBy.order])

    const sortHandler = (sortItem: string) => {
        if (sortBy.iter === sortItem) {
            setSortBy(prevState => ({...prevState, order: prevState.order === "asc" ? "desc" : "asc"}))
        } else {
            setSortBy({
                iter: sortItem,
                order: "asc"
            })
        }
    }

    //Filtering by the text field
    const {value, onChange} = useInput("")
    const filerTextField = (value: string) => {
        const filter = sortedData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
        return filter
    }
    const filteredData = filerTextField(value)

    // Calculating the number of pages
    const count = filteredData.length
    const pageSize = 3
    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageChangeHandler = (page: number) => {
        setCurrentPage(page)
    }

    // Cropping data onto pages
    const paginate = (data: IData[], pageNumber: number, pageSize: number) => {
        const start = (pageNumber - 1) * pageSize
        return [...data].splice(start, pageSize)
    }
    const croppedData = paginate(filteredData, currentPage, pageSize)

    return (
        <TableWrapper>
            <TextField placeholder="Search item..." value={value} onChange={onChange} />
            {
                loading && <Loader />
            }
            {
                error && <Error error={error} />
            }
            {
                data && !loading && !error && <Table sortHandler={sortHandler} data={croppedData} order={sortBy} />
            }
        <Pagination pageSize={pageSize} count={count} onClick={pageChangeHandler} currentPage={currentPage} />
        </TableWrapper>
    );
};

export default MainPage