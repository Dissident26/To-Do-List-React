import React, { useState, useEffect } from 'react';
import {saveToStorage, extractFromStorage} from '../utils';
import ToDoList from '../ToDoList/ToDoList';
import SectionSort from '../SectionSort/SectionSort';
import SectionSearch from '../SectionSearch/SectionSearch';
import SectionAdd from '../SectionAdd/SectionAdd';
const sampleData = [{id: 0, text: 'ala1bla1bla', date: '2020-09-12', complited: true}, {id: 1, text: 'cla2bla2bla2', date: '2020-11-12', complited: false}, {id: 2, text: 'ela3bla3bla3', date: '2020-09-15', complited: true}, {id: 3, text: 'bla4bla4bla4', date: '2020-12-01', complited: false}, {id: 4, text: 'bla5bla5bla5', date: '2020-02-19', complited: true}];

export default function ToDoListMain(){

    const[data, setData] = useState(null);
    const[searchData, setSearchData] = useState(null);
    const[textInputData, setTextInputData] = useState('');
    const[dateInputData, setDateInputData] = useState('');
    const[complitedInputData, setComplitedInputData] = useState(null);
    const[textInputError, setTextInputError] = useState(null);
    const[dateInputError, setDateInputError] = useState(null);
    const[filterDate, setFilterDate] = useState(null);
    const[filterText, setFilterText] = useState(null);

    useEffect(()=>{
        if(!data){
            const storageData = extractFromStorage('to-do-list-data');
            setData(storageData ? storageData : sampleData);
            setSearchData(storageData ? storageData : sampleData);
        }
        saveToStorage('to-do-list-data', data);
    },[data]);
    const addItem = () => {
        const item = {
            id: data.length + 1, 
            text: textInputData, 
            date: dateInputData, 
            complited: complitedInputData
        };
        if(dateInputData && dateInputData){
            setTextInputData('');
            setDateInputData('');
            setComplitedInputData(null);
            setData([...data, item]);
            setSearchData([...searchData, item]);
        }
        else{
            setTextInputError(!!!textInputData);
            setDateInputError(!!!dateInputData);
        }
        
    };
    const onStatusChange = (id) => {
        const changed = data.find((item)=>item.id === id);
        const index = data.indexOf(changed);
        const length = data.length;
        setData([...data.slice(0, index),
            {id: changed.id, text: changed.text, date: changed.date, complited: !changed.complited},
             ...data.slice(index+1, length)]);
    };
    const deleteItem = (id) => {
        setData([...data.filter((el)=>el.id !== id)]);
        setSearchData([...searchData.filter((el)=>el.id !== id)]);
    };
    const onTextInputChange = (e) => setTextInputData(e.target.value);
    const onDateInputChange = (e) => setDateInputData(e.target.value);
    const onComplitedInputChange = (e) => setComplitedInputData(e.target.value);
    const sortById = () => setSearchData([...searchData.sort((a, b) => a.id - b.id)]);
    const onSearchDateInputChange = (e) => {
        setFilterDate(e.target.value);
        filterData(filterText, e.target.value);
    };
    const onSearchTextInputChange = (e) => {
        setFilterText(e.target.value);
        filterData(e.target.value, filterDate);
    };
    const filterData = (text, date) => {
        setSearchData([...data.filter((el)=>{            
            if(!date) return el.text.includes(text);  
            if(!text) return el.date === date;
            if(date && text)return el.text.includes(text) && el.date === date;
            else return el.text.includes(filterText) && el.date === filterDate;
            })]
        );
    };
    const sortByDate = (e) => {
        switch(e.target.value){
            case 'По возрастанию' : setSearchData([...searchData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))]); break;
            case 'По убыванию' : setSearchData([...searchData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))]); break;
            default : sortById(); break;
        };
    };
    const sortByText = (e) => {
        setSearchData([...searchData.sort((a, b)=>{
            const textA = a.text.toLowerCase(), textB = b.text.toLowerCase();
            if(textA > textB) return (e.target.value === 'По возрастанию') ? 1 : -1;
            if(textA < textB) return (e.target.value === 'По возрастанию') ? -1 : 1;
            return null;
            })
        ]);
        if(e.target.value === 'Все'){
            this.sortById();
        };
    };

    if(!data) return '...Loading Data...';

    return(
        <>
            <div className="main">
                <h1>To Do List</h1>
                <SectionSort 
                    onChangeText={sortByText} 
                    onChangeDate={sortByDate}
                />
                <SectionSearch 
                    onSearchDateInputChange={onSearchDateInputChange} 
                    onSearchTextInputChange={onSearchTextInputChange}
                />                                 
                <ToDoList 
                    list={searchData}
                    onStatusChange={onStatusChange}
                    deleteItem={deleteItem}
                />
                <SectionAdd 
                    addItem = {addItem}
                    textInputData = {textInputData} 
                    dateInputData = {dateInputData}
                    onTextInputChange = {onTextInputChange}
                    onDateInputChange = {onDateInputChange} 
                    onComplitedInputChange = {onComplitedInputChange}
                    textInputError = {textInputError}
                    dateInputError = {dateInputError}
                />
            </div>
            </>
    )
};