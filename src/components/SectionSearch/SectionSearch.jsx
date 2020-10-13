import React, {useState, useEffect} from 'react';
import Input from '../Input/Input';
import { connect } from 'react-redux';
import {actionFilter} from '../action-creators/action-creators';

function SectionSearch({onFilterChange}){

    const[searchText, setSearchText] = useState('');
    const[searchDate, setSearchDate] = useState('');

    useEffect(()=>{
        onFilterChange(searchText, searchDate)
    }, [searchText, searchDate, onFilterChange]);

    return(
        <div className="search-item-section">
            <Input
                type="text" 
                name="sort_by-text" 
                onChange={(e)=>setSearchText(e.target.value)}
                title='Поиск: '
            />
            <Input
                type="date" 
                name="sort_by-date"
                onChange={(e)=>setSearchDate(e.target.value)}
            />
        </div>      
    )
};

export default connect(
    state => ({state}),
    (dispatch) => ({
        onFilterChange: (textFilterValue, dateFilterValue) => dispatch(actionFilter(textFilterValue, dateFilterValue))
    })
)(SectionSearch);
