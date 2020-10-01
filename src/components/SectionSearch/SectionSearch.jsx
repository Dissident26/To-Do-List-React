import React from 'react';
import Input from '../Input/Input';

export default function SectionSearch({onSearchTextInputChange, onSearchDateInputChange}){
    return(
        <div className="search-item-section">
            <Input
                type="text" 
                name="sort_by-text" 
                onChange={onSearchTextInputChange}
                title='Поиск: '
            />
            <Input
                type="date" 
                name="sort_by-date" 
                onChange={onSearchDateInputChange}
            />
        </div>      
    )
};
