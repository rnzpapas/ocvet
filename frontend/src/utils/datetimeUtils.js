

const adjustMonthVisuals = (month) => {
    let nm = month + 1;

    if(month < 10){
        return `0${nm}`;
    }
    return month;
}

export const convertDate = (date) => {
    let d = new Date(date);
    return `${adjustMonthVisuals(d.getMonth())}-${d.getDate()}-${d.getFullYear()}`;
}

export const convertTime = (time) => {
    
}