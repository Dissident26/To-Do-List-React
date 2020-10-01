export function saveToStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
};
export function extractFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
};