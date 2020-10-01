import React from 'react';
import ToDoListItem from '../ToDoListItem/ToDoListItem';

export default function ToDoList({list, onStatusChange, deleteItem}){
    return(
        <div className="list">
            <ul>
                {(!list.length) ? 'Нет элементов для отображения' : list.map((list)=> 
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