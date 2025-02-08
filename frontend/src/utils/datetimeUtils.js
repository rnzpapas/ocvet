

export const adjustMonthVisuals = (month) => {
    let nm = month + 1;

    if(month < 10){
        return `0${nm}`;
    }
    return month;
}

export const adjustTimeVisuals = (time) => {
    if(time < 10){
        return `0${time}`;
    }
    return time;
}

export const adjustDayVisuals = (day) => {
    if(day < 10){
        return `0${day}`;
    }
    return day;
}

export const convertDate = (date) => {
    let d = new Date(date);
    return `${adjustMonthVisuals(d.getMonth())}-${adjustDayVisuals(d.getDate())}-${d.getFullYear()}`;
}

export const convertTime = (time) => {
    let timeArr = time.split(":");
    let timeInTwelveHrClockAbbrv = parseInt(timeArr[0]) >= 12 ? 'PM' : 'AM';
    let timeInTwelveHrClock = parseInt(timeArr[0]) > 12 ? adjustTimeVisuals((parseInt(timeArr[0]) - 12)) : timeArr[0];
    
    return `${timeInTwelveHrClock}:${timeArr[1]} ${timeInTwelveHrClockAbbrv}`;


}