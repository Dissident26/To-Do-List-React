import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ToDoList from '../ToDoList/ToDoList';
import SectionSort from '../SectionSort/SectionSort';
import SectionSearch from '../SectionSearch/SectionSearch';
import SectionAdd from '../SectionAdd/SectionAdd';
import { extractFromStorage} from '../utils';

const storageData = extractFromStorage('to-do-list-data');
const sampleData = [
    {id: 0, text: 'ala1bla1bla', date: '2020-09-12', complited: true}, 
    {id: 1, text: 'cla2bla2bla2', date: '2020-11-12', complited: false}, 
    {id: 2, text: 'ela3bla3bla3', date: '2020-09-15', complited: true}, 
    {id: 3, text: 'bla4bla4bla4', date: '2020-12-01', complited: false}, 
    {id: 4, text: 'bla5bla5bla5', date: '2020-02-19', complited: true}
];
const data = storageData ? storageData : sampleData;
const sampleState = {
    data: data,
    textInputData: '',
    dateInputData: '',
    complitedInputData: null,
    textInputError: null,
    dateInputError: null,
    filterDate: null,
    filterText: null
};

function toDoListReducer(state = sampleState, {type, payload}){
    state = {...state, 
        searchData: [...state.data]
    };
    switch(type){
        case 'add-item' : {
            return addItem(state, payload)
        }
        case 'status-change': {
            return onStatusChange(state, payload);
        }
        case 'delete-item': {
            return deleteItem(state, payload);
        }
        case 'text-sort-change' : {
            return sortByText(state, payload)
        }
        case 'date-sort-change' : {
            return sortByDate(state, payload)
        }
        case 'filter-change' : {
            return filterData(state, payload)
        }
        case 'load-data' : {
            return loadData(state, payload)
        }
        default: return state;
    }
};
function onStatusChange(state, payload){
    const changed = state.data.find((item)=>item.id === payload.id);
    const index = state.data.indexOf(changed);
    const length = state.data.length;
    return {...state, 
        data: [...state.data.slice(0, index),
        {id: changed.id, text: changed.text, date: changed.date, complited: !changed.complited},
         ...state.data.slice(index+1, length)]};
};
function deleteItem (state, payload){
        return { ...state, 
            data: [...state.data.filter((el)=>el.id !== payload.id)],
            searchData : [...state.data.filter((el)=>el.id !== payload.id)]
        }
    };
function addItem(state, payload){
    const item = {
        id: state.data.length+1,
        text: payload.title,
        date: payload.date,
        complited: payload.complited
    }
    return {...state, 
        data: [...state.data, item],
        searchData: [...state.data, item]
        }
    };
function sortById(state){
    return {...state, 
        searchData: [...state.data.sort((a, b) => a.id - b.id)]
    };
};
function sortByDate(state, payload){
        switch(payload.sortType){
            case 'По возрастанию' : return {
                ...state,
                searchData: [...state.data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))]
            };
            case 'По убыванию' : return {
                ...state, 
                searchData: [...state.data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))]
            };
            default : return sortById(state);
        };
    };
function sortByText(state, payload){
    if(payload.sortType === 'Все'){
        return sortById(state);
    };
        return {
            ...state, 
            data: [...state.data.sort((a, b)=>{
                const textA = a.text.toLowerCase(), textB = b.text.toLowerCase();
                if(textA > textB) return (payload.sortType === 'По возрастанию') ? 1 : -1;
                if(textA < textB) return (payload.sortType === 'По возрастанию') ? -1 : 1;
                return null;
                })
            ]
        }
    };
function filterData(state, {textFilterValue, dateFilterValue}){
    return {
        ...state, 
        searchData: [...state.data.filter( el =>  {
            if(!dateFilterValue) return el.text.includes(textFilterValue);
            if(!textFilterValue) return el.date === dateFilterValue;
            if(dateFilterValue && textFilterValue)
                return el.text.includes(textFilterValue) && el.date === dateFilterValue;
            else return el.text.includes(textFilterValue) && el.date === dateFilterValue;
        })] 
    }
};
function loadData(state, payload){
    return{
        ...state,
        data: payload.data
    }
}
const store = createStore(toDoListReducer);
    //store.subscribe(()=>console.log(store.getState()))
export default function ToDoListMain(){

    return(
        <Provider store={store}>
            <div className="main">
                <h1>To Do List</h1>
                <SectionSort/>
                <SectionSearch/>                                 
                <ToDoList/>
                <SectionAdd/>
            </div>
            </Provider>
    )
};