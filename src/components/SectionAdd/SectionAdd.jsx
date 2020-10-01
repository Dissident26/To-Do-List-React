import React from 'react';
import Input from '../Input/Input'
export default function SectionAdd({
        addItem,
        textInputData, 
        dateInputData, 
        onTextInputChange, 
        onDateInputChange, 
        onComplitedInputChange, 
        textInputError,
        dateInputError
    }){
    return(
        <div className="add-item-section">
                    <button onClick={addItem}>
                        Добавить
                    </button>
                    <Input 
                        type="text" 
                        name="text-input" 
                        value={textInputData} 
                        onChange={onTextInputChange} 
                        className={textInputError ? 'input-error' : ''}>
                    </Input>
                    <Input 
                        type="date" 
                        name="date-input" 
                        value={dateInputData} 
                        onChange={onDateInputChange} 
                        className={dateInputError ? 'input-error' : ''}>
                    </Input>
                    Выполнено
                    <Input 
                        type="checkbox" 
                        name="complited-input" 
                        onChange={onComplitedInputChange}>
                    </Input>
                </div>
    )
};