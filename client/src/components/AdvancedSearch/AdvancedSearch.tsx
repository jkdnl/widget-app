import React from 'react';
import TextField from "../TextField";

interface advancedSearchProps {
    selectChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
    select: string,
    minValue: string,
    maxValue: string,
    onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AdvancedSearch: React.FC<advancedSearchProps> = ({
    select, selectChangeHandler, onMaxChange, onMinChange, maxValue, minValue
}) => {

    return (
        <details>
            <summary className="my-2">Advanced Search</summary>
            <div className="sm:flex border-2 rounded p-2">
                <select className="outline-0 mr-4" defaultValue={select} onChange={selectChangeHandler}>
                    <option value="quantity">Quantity</option>
                    <option value="distance">Distance</option>
                </select>
                <TextField value={minValue} onChange={onMinChange} type={"number"} placeholder={"Enter minimum amount"} />
                <TextField value={maxValue} onChange={onMaxChange} type={"number"} placeholder={"Enter maximum amount"} />
            </div>
        </details>
    );
};

export default AdvancedSearch;