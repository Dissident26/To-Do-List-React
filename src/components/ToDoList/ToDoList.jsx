import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import ToDoListItem from '../ToDoListItem/ToDoListItem';
import {saveToStorage} from '../utils';
import {actionStatusChange, actionDeleteItem} from '../action-creators/action-creators';

function ToDoList({state, onStatusChange, deleteItem}){
    
    

    useEffect(()=>{
        saveToStorage('to-do-list-data', state.data);
    },[state.data]);
    
    return(
        <div className="list">
            <ul>
                {(!state.searchData.length) ? 'Нет элементов для отображения' : state.searchData.map((list)=> 
                    <ToDoListItem 
                        key={list.id}
                        id={list.id}
                        text={list.text}
                        date={list.date}
                        complited={list.complited}
                        onStatusChange={onStatusChange}
                        deleteItem={deleteItem}
                    />
                )}
            </ul>
        </div>
    )
}

export default connect(
    state => ({state}),
    (dispatch) => ({
        onStatusChange: (id) => dispatch(actionStatusChange(id)),
        deleteItem: (id) => dispatch(actionDeleteItem(id))
    })
)(ToDoList);