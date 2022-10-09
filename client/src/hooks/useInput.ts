import React, {useState} from 'react';

interface UseInputProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    resetValue: () => void
}

function useInput(initialValue: string): UseInputProps {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const resetValue = () => setValue("")

    return {value, onChange, resetValue}
}

export default useInput;