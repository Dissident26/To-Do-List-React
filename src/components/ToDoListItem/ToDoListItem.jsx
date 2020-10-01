import React from 'react';

export default function ToDoListItem({id, text, date, complited, onStatusChange, deleteItem}){
    return(
        <li><strong>{text} </strong>Добавлено: {date}.{complited} Выполнено: <input type="checkbox" defaultChecked={complited} onChange={()=>onStatusChange(id)}></input><button className="delete-button" onClick={()=>deleteItem(id)}>Удалить</button></li>
    )
};