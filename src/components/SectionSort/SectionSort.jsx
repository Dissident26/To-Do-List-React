import React from 'react';
import SortSelect from '../SortSelect/SortSelect';

export default function SectionSort({onChangeText, onChangeDate}){
    return(
        <div className="sort-item-section">
                    <SortSelect
                        name="sort-by-text" 
                        onChange={onChangeText} 
                        defaultValue="Все"
                        title={'Сортировать по содержимому: '} 
                    />
                    <SortSelect
                        name="sort-by-date" 
                        onChange={onChangeDate} 
                        defaultValue="Все"
                        title={'Сортировать по дате: '}
                    />
                </div>
    )
};