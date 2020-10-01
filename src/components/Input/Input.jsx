import React from 'react';

export default function SearchInput({type, name, onChange, title, value, className}){
    return(
        <>
            {title}
            <input 
                type={type} 
                name={name}
                onChange={onChange}
                value={value}
                className={className}
            >
            </input>
        </>
    )
};