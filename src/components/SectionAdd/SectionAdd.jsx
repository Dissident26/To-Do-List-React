import React from 'react';
import Input from '../Input/Input'
import { connect } from 'react-redux';
import { useState } from 'react';
import { actionAddItem } from '../action-creators/action-creators';
function SectionAdd({onAdd}){

        const[textInputData, setTextInputData] = useState('');
        const[dateInputData, setDateInputData] = useState('');
        const[complitedInputData, setComplitedInputData] = useState(false);
        const[textInputError, setTextInputError] = useState(null);
        const[dateInputError, setDateInputError] = useState(null);

    function handleInputs(){
        if(dateInputData && dateInputData){
            onAdd(textInputData, dateInputData, complitedInputData);
            setTextInputData('');
            setDateInputData('');
            setComplitedInputData(false);
        }   
        else {
            setTextInputError(!!!textInputData);
            setDateInputError(!!!dateInputData);
        }
    };

    return(
        <div className="add-item-section">
                    <button onClick={handleInputs}>
                        Добавить
                    </button>
                    <Input 
                        type="text" 
                        name="text-input" 
                        value={textInputData} 
                        onChange={(e)=>setTextInputData(e.target.value)} 
                        className={textInputError ? 'input-error' : ''}>
                    </Input>
                    <Input 
                        type="date" 
                        name="date-input" 
                        value={dateInputData} 
                        onChange={(e)=>setDateInputData(e.target.value)} 
                        className={dateInputError ? 'input-error' : ''}>
                    </Input>
                    Выполнено
                    <Input 
                        type="checkbox" 
                        name="complited-input" 
                        onChange={(e)=>setComplitedInputData(e.target.value)}>
                    </Input>
                </div>
    )
};

export default connect(
    state => ({state}),
    (dispatch) => ({
        onAdd: (textInputData, 
            dateInputData, 
            complitedInputData
        ) => dispatch(actionAddItem(textInputData, dateInputData, complitedInputData))
    })
)(SectionAdd)