import React from 'react';
import SortSelect from '../SortSelect/SortSelect';
import { connect } from 'react-redux';
import {actionSortText, actionSortDate} from '../action-creators/action-creators';

function SectionSort({onChangeText, onChangeDate}){

    return(
        <div className="sort-item-section">
                    <SortSelect
                        name="sort-by-text" 
                        onChange={onChangeText} 
                        defaultValue="Все"
                        title={'Сортировать по содержимому: '} 
                    />
                    <SortSelect
                        name="sort-by-date" 
                        onChange={onChangeDate} 
                        defaultValue="Все"
                        title={'Сортировать по дате: '}
                    />
                </div>
    )
};

export default connect(
    state => ({state}),
    (dispatch) => ({
        onChangeText: (e) => dispatch(actionSortText(e)),
        onChangeDate: (e) => dispatch(actionSortDate(e)),
    })
)(SectionSort);