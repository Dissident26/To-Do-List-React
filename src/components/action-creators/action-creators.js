export function actionAddItem(
    textInputData, 
    dateInputData, 
    complitedInputData){
    return{
            type: 'add-item',
            payload: {
                title: textInputData,
                date: dateInputData,
                complited: complitedInputData
        }
    };
};
export function actionStatusChange(id){
    return{
        type: 'status-change',
        payload: {
            id: id,
        }
    };
};
export function actionDeleteItem(id){
    return{
        type: 'delete-item',
        payload: {
            id: id,
        }
    };
};
export function actionSortText(e){
    return{
        type: 'text-sort-change',
        payload: {
            sortType: e.target.value,
        }
    };
};
export function actionSortDate(e){
    return {
        type: 'date-sort-change',
        payload: {
            sortType: e.target.value,
        }
    };
};
export function actionFilter(textFilterValue, dateFilterValue){
    return{
        type: 'filter-change',
            payload: {
                textFilterValue: textFilterValue,
                dateFilterValue: dateFilterValue
            }
    };
};
