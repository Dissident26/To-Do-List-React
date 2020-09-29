export function addItem(text, date, complited, data, searchData, setState){
    const item = {id: data.length, text: text, date: date, complited: complited};
    (text && date) ? 
    setState(()=> ({textInputData: '', 
        dateInputData: '', 
        complitedInputData: null, 
        textInputError: false,
        dateInputError: false,
        data: [...data, item], 
    }), setState({searchData: [...searchData, item]})) : setState(()=>({
        textInputError: text ? false : true,
        dateInputError: date ? false : true
    }));
    
};
export function onStatusChange(id, data, setState){
    const changed = data.find((item)=>item.id === id);
    const index = data.indexOf(changed);
    const length = data.length;
    setState({data: [...data.slice(0, index), 
        {id: changed.id, text: changed.text, date: changed.date, complited: (changed.complited) ? false : true}, 
        ...data.slice(index+1, length)]});
};
export function deleteItem(id, data, searchData, setState){
    setState({data: [...data.filter((el)=>el.id !== id)]});
    setState({searchData: [...searchData.filter((el)=>el.id !== id)]});
};
export function saveToStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
};
export function extractFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
};
export function filterData(text, date, data, filterText, filterDate, setState){
    if(text) setState({filterText: text});
    if(date) setState({filterDate: date});
    setState({searchData: [...data.filter((el)=>{            
        if(!date) return el.text.includes(text);  
        if(!text) return el.date === date;
        if(date && text)return el.text.includes(text) && el.date === date;
        else return el.text.includes(filterText) && el.date === filterDate;
        })] 
    });
};
function sortById(data, setState){
    setState({searchData : [...data.sort((a, b) => a.id - b.id)]});
};
export function sortByDate(params, data, setState){
    switch(params){
        case 'По возрастанию' : setState({searchData : [...data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))]}); break;
        case 'По убыванию' : setState({searchData : [...data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))]}); break;
        default : sortById(data, setState); break;
    };
};
export function sortByText(params, data, setState){
    setState({searchData: [...data.sort((a, b)=>{
        const textA = a.text.toLowerCase(), textB = b.text.toLowerCase();
        if(textA > textB) return (params === 'По возрастанию') ? 1 : -1;
        if(textA < textB) return (params === 'По возрастанию') ? -1 : 1;
        })
    ]});
    if(params === 'Все'){
        sortById(data, setState);
    };
};
