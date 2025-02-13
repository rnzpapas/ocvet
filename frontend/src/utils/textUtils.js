
export const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const convertObjectArrayToString = (obj) => {
    let str = '';
    obj.forEach(word => {
        str = str + word;
        (str.length > 0 && obj.length > 1) && (str = str + ', ');
    })
    return str;
}   