import React from 'react';
import {saveToStorage, extractFromStorage} from '../utils';
import ToDoList from '../ToDoList/ToDoList';
import SectionSort from '../SectionSort/SectionSort';
import SectionSearch from '../SectionSearch/SectionSearch';
import SectionAdd from '../SectionAdd/SectionAdd';
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
    addItem = () => {
        const item = {
            id: this.state.data.length + 1, 
            text: this.state.textInputData, 
            date: this.state.dateInputData, 
            complited: this.state.complitedInputData
        };
        if(this.state.dateInputData && this.state.dateInputData){
            this.setState(({
            textInputData: '', 
            dateInputData: '', 
            complitedInputData: null, 
            data: [...this.state.data, item], 
            searchData: [...this.state.searchData, item],   
            })
        )}
        else{
            this.setState(({
                textInputError: !!!this.state.textInputData,
                dateInputError: !!!this.state.dateInputData
            }))
        }
        
    };
    onStatusChange = (id) => {
        const changed = this.state.data.find((item)=>item.id === id);
        const index = this.state.data.indexOf(changed);
        const length = this.state.data.length;
        this.setState({data: [...this.state.data.slice(0, index), 
            {id: changed.id, text: changed.text, date: changed.date, complited: !changed.complited}, 
            ...this.state.data.slice(index+1, length)]});
            return null;
    };
    deleteItem = (id) => {
        this.setState({data: [...this.state.data.filter((el)=>el.id !== id)]});
        this.setState({searchData: [...this.state.searchData.filter((el)=>el.id !== id)]});
    };
    onTextInputChange = (e) => this.setState({textInputData : e.target.value});
    onDateInputChange = (e) => this.setState({dateInputData : e.target.value});
    onComplitedInputChange = (e) => this.setState({complitedInputData : e.target.checked});
    onSortDateChange = (e) => this.sortByDate(e.target.value);
    onSortTextChange = (e) => this.sortByText(e.target.value);
    sortById = () => this.setState({searchData : [...this.state.searchData.sort((a, b) => a.id - b.id)]});
    onSearchDateInputChange = (e) => {
        this.setState({filterDate: e.target.value});
        this.filterData(this.state.filterText, e.target.value);
    };
    onSearchTextInputChange = (e) => {
        this.setState({filterText: e.target.value});
        this.filterData(e.target.value, this.state.filterDate);
    };
    filterData = (text, date) => {
        this.setState({searchData: [...this.state.data.filter((el)=>{            
            if(!date) return el.text.includes(text);  
            if(!text) return el.date === date;
            if(date && text)return el.text.includes(text) && el.date === date;
            else return el.text.includes(this.state.filterText) && el.date === this.state.filterDate;
            })] 
        });
    };
    sortByDate = (e) => {
        switch(e.target.value){
            case 'По возрастанию' : this.setState({searchData : [...this.state.searchData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))]}); break;
            case 'По убыванию' : this.setState({searchData : [...this.state.searchData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))]}); break;
            default : this.sortById(); break;
        };
    };
    sortByText = (e) => {
        this.setState({searchData: [...this.state.searchData.sort((a, b)=>{
            const textA = a.text.toLowerCase(), textB = b.text.toLowerCase();
            if(textA > textB) return (e.target.value === 'По возрастанию') ? 1 : -1;
            if(textA < textB) return (e.target.value === 'По возрастанию') ? -1 : 1;
            return null;
            })
        ]});
        if(e.target.value === 'Все'){
            this.sortById();
        };
    };
    render(){
        if(!this.state.data) return 'Loading Data...';
        return (
            <>
            <div className="main">
                <h1>To Do List</h1>
                <SectionSort 
                    onChangeText={this.sortByText} 
                    onChangeDate={this.sortByDate}
                />
                <SectionSearch 
                    onSearchDateInputChange={this.onSearchDateInputChange} 
                    onSearchTextInputChange={this.onSearchTextInputChange}
                />                                 
                <ToDoList 
                    list={this.state.searchData}
                    onStatusChange={this.onStatusChange}
                    deleteItem={this.deleteItem}
                />
                <SectionAdd 
                    addItem = {this.addItem}
                    textInputData = {this.state.textInputData} 
                    dateInputData = {this.state.dateInputData}
                    onTextInputChange = {this.onTextInputChange}
                    onDateInputChange = {this.onDateInputChange} 
                    onComplitedInputChange = {this.onComplitedInputChange}
                    textInputError = {this.state.textInputError}
                    dateInputError = {this.state.dateInputError}
                />
            </div>
            </>
        )
    };
};