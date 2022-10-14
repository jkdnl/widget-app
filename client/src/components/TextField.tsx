import React from 'react';

interface TextFieldProps {
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: "text" | "number"
}

const TextField: React.FC<TextFieldProps> = ({placeholder = "Enter value", value, onChange, type= "text"}) => {

    return (
        <input
            className="outline-0 p-2 w-full border-2 rounded focus:border-blue-700 transition-all my-2"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
        />
    );
};

export default TextField;