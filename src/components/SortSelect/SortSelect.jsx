import React from 'react';

export default function SortSelect({onChange, defaultValue, name, title}){
    return(
        <>
            <span>{title}</span>
                <select
                    name={name}
                    onChange={onChange} 
                    defaultValue={defaultValue}>
                    <option name="show-all">Все</option>
                    <option name="sort-asc">По возрастанию</option>
                    <option name="sort-desc">По убыванию</option>
            </select>
        </>
    )
}