import React from 'react';

interface TextFieldProps {
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<TextFieldProps> = ({placeholder = "Enter value", value, onChange}) => {

    return (
        <input
            className="outline-0 p-2 w-full border-2 rounded focus:border-blue-700 transition-all my-2"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default TextField;