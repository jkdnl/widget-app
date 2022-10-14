import React, { useEffect, useState } from 'react';
import Table from "../components/table/Table";
import TableWrapper from "../components/wrappers/TableWrapper";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchData } from "../store/actions/dataActions";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import Pagination from "../components/Pagination";
import IData from "../models/IData";
import {orderBy} from "lodash";
import TextField from "../components/TextField";
import useInput from "../hooks/useInput";
import AdvancedSearch from "../components/AdvancedSearch/AdvancedSearch";

const MainPage: React.FC = () => {

    // Fetching the data
    const {data, loading, error} = useAppSelector(state => state.dataReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    //Advanced search
    const {value: minValue, onChange: onMinChange, resetValue: resetMin} = useInput("")
    const {value: maxValue, onChange: onMaxChange, resetValue: resetMax} = useInput("")

    const [select, setSelect] = useState<string>("quantity")
    const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value)
        resetMin()
        resetMax()
    }

    const filerNumField = () => {
        return data.filter(item => {
            switch (select) {
                case "quantity":
                    if (minValue && maxValue) return item.quantity >= Number(minValue) && item.quantity <= Number(maxValue)
                    if (minValue) return item.quantity >= Number(minValue)
                    if (maxValue) return item.quantity >= Number(minValue)
                    return
                case "distance":
                    if (minValue && maxValue) return item.distance >= Number(minValue) && item.distance <= Number(maxValue)
                    if (minValue) return item.distance >= Number(minValue)
                    if (maxValue) return item.distance >= Number(minValue)
                    return
                default:
                    return data
            }
        });
    }
    const filteredNumData: IData[] = filerNumField()

    // Sorting Data (with Lodash "orderBy" function)
    const [sortBy, setSortBy] = useState<{iter: string, order: "asc" | "desc" | boolean}>({iter: "", order: false})
    const sortedData = orderBy(filteredNumData.length > 0 ? filteredNumData : data, [sortBy.iter], [sortBy.order])

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
        return sortedData.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        )
    }
    const filteredTextData = filerTextField(value)

    // Calculating the number of pages
    const count = filteredTextData.length
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
    const croppedData = paginate(filteredTextData, currentPage, pageSize)

    useEffect(() => {
        setCurrentPage(1)
    }, [value, minValue, maxValue])

    return (
        <TableWrapper>
            {
                !loading && !error && <TextField placeholder="Search item..." value={value} onChange={onChange} type={"text"}/>
            }
            {
                !loading && !error && <AdvancedSearch
                    selectChangeHandler={selectChangeHandler}
                    select={select}
                    maxValue={maxValue}
                    minValue={minValue}
                    onMaxChange={onMaxChange}
                    onMinChange={onMinChange}
                />
            }
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