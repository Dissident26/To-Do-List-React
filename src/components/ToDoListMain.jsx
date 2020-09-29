import React from 'react';
import ToDoListItem from './ToDoListItem';
import {addItem, deleteItem, onStatusChange, filterData, saveToStorage, extractFromStorage, sortByDate, sortByText} from './utils';
const sampleData = [{id: 0, text: 'ala1bla1bla', date: '2020-09-12', complited: true}, {id: 1, text: 'cla2bla2bla2', date: '2020-11-12', complited: false}, {id: 2, text: 'ela3bla3bla3', date: '2020-09-15', complited: true}, {id: 3, text: 'bla4bla4bla4', date: '2020-12-01', complited: false}, {id: 4, text: 'bla5bla5bla5', date: '2020-02-19', complited: true}];

export default class ToDoListMain extends React.Component {
    state={
        data: null,
        searchData: null,
        textInputData: '',
        dateInputData: '',
        complitedInputData: null,
        textInputError: null,
        dateInputError: null,
        filterDate: null,
        filterText: null
    };
    componentDidMount(){
        const storageData = extractFromStorage('to-do-list-data');
        this.setState({data: storageData ? storageData : sampleData,
                searchData : storageData ? storageData : sampleData});
    };
    componentDidUpdate(){  
        saveToStorage('to-do-list-data', this.state.data);
    };
    render(){
        return (!this.state.data) ? 'Loading Data...' : (
            <>
            <div className="main">
                <h1>To Do List</h1>
                <div className="sort-item-section">
                    <span>Сортировать по содержимому: </span>
                    <select name="sort-by-text" onChange={(e)=>sortByText(e.target.value, this.state.searchData, this.setState.bind(this), 'text')} defaultValue={"Все"}>
                        <option name="show-all">Все</option>
                        <option name="sort-asc">По возрастанию</option>
                        <option name="sort-desc">По убыванию</option>
                    </select>
                    <span>Сортировать по дате: </span>
                    <select name="sort-by-date" onChange={(e)=>sortByDate(e.target.value, this.state.searchData, this.setState.bind(this), 'date')} defaultValue={"Все"}>
                        <option name="show-all">Все</option>
                        <option name="sort-asc">По возрастанию</option>
                        <option name="sort-desc">По убыванию</option>
                    </select>
                </div>
                <div className="search-item-section">
                    <span>Поиск: </span>
                        <input type="text" name="sort_by-text" onChange={(e)=>filterData(e.target.value, this.state.filterDate, this.state.data, this.state.filterText, this.state.filterDate, this.setState.bind(this))}></input>
                        <input type="date" name="sort_by-date" onChange={(e)=>filterData(this.state.filterText, e.target.value, this.state.data, this.state.filterText, this.state.filterDate, this.setState.bind(this))}></input>
                </div>                                       
                <ul className="list">
                {(this.state.searchData.length === 0) ? 'Нет элементов для отображения' :
                this.state.searchData.map((list)=> <ToDoListItem 
                    key={list.id}
                    id={list.id}
                    text={list.text}
                    date={list.date}
                    complited={list.complited}
                    onStatusChange={(id)=>onStatusChange(id, this.state.data, this.setState.bind(this))}
                    deleteItem={(id)=>deleteItem(id, this.state.data, this.state.searchData, this.setState.bind(this))}
                /> )}
                </ul>
                <div className="add-item-section">
                    <button onClick={()=>addItem(this.state.textInputData, this.state.dateInputData, this.state.complitedInputData, this.state.data, this.state.searchData, this.setState.bind(this))}>Добавить</button>
                    <input type="text" name="text-input" value={this.state.textInputData} onChange={(e)=>this.setState({textInputData : e.target.value})} className={this.state.textInputError ? 'input-error' : ''}></input>
                    <input type="date" name="date-input" value={this.state.dateInputData} onChange={(e)=>this.setState({dateInputData : e.target.value})} className={this.state.dateInputError ? 'input-error' : ''}></input>
                    Выполнено<input type="checkbox" name="complited-input" onChange={(e)=>this.setState({complitedInputData : e.target.checked})}></input>
                </div>
            </div>
            </>
        )
    };
};