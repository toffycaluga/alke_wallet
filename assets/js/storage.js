// obtiene un texto desde localStorage 

export function getString(key, fallback = null){
    try{
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
    }catch(error){
        console.error(`No se puedo leer la clave ${key}.`, error);
        return fallback
    }
}

// guardar un texto en localStorage

export function setString(key, value){
    try{
        localStorage.setItem(key, String(value));
        return true;
    }catch(error){
        console.error(`No se pudo guardar la clave ${key}.`,error)
    }
}

// lee y parsea JSON  desde localStorage. Si el JSON esta corrupto, devuelve 
// fallback sin borrar informacion.


export function getJson(key, fallback){
    const rawValue = getString(key);

    if (rawValue === null){
        return fallback;
    }

    try{
        return JSON.parse(rawValue);
    }catch(error){
        console.error(`JSON corrupto en la clave ${key}.`,error);
        return fallback
    }
}

// serializa y guarda JSON en localStorage

export function setJson(key, value){
    try{
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }catch(error){
        console.error(`No se pudo guardar JSON en la clave ${key}.`,error);
        return false;
    }
}


// elimina clave de localStorage

export function removeItem(key){
    try{
        localStorage.removeItem(key);
        return true;
    }catch(error){
        console.error(`No se pudo eliminar la clave ${key}.`,error);
        return false;
    }
}
