
export const generateInitialId = (idPrefix) => {
    return idPrefix + "100000";
}

export const generateNewId = (latestId, idPrefix, colName = null) => {
    let new_uid;
    new_uid = colName === null ? parseInt(latestId[0][idPrefix].toString().split(idPrefix)[1]) : parseInt(latestId[0][colName].toString().split(idPrefix)[1])    
    new_uid++;
    new_uid = idPrefix + new_uid;
    return new_uid;
}