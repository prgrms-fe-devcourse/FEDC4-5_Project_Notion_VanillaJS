const storage= window.localStorage

export const getItem = (key,defaultValue) => {
    try{
        const storedValue = storage.getItem(JSON.stringify(key))
        return storedValue ? JSON.parse(storedValue) : defaultValue
    }catch(e){
        return defaultValue 
    }
}

export const setItem = (key,value)=> {
    window.localStorage.setItem(JSON.stringify(key),JSON.stringify(value))  
}


export const removeItem = (key) => {
    storage.removeItem(key)
}