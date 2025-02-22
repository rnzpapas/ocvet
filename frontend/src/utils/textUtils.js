
export const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const convertObjectArrayToString = (obj) => {
    let str = '';
    try{
        obj.forEach(word => {
            str = str + word;
            (str.length > 0 && obj.length > 1) && (str = str + ', ');
        })
    }catch{
        // console.log(obj)
    }
    return str;
}   