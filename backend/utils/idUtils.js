
export const generateInitialId = (idPrefix) => {
    return idPrefix + "100000";
}

export const generateNewId = (latestId, idPrefix) => {
    let new_uid = parseInt((latestId)[0][idPrefix].toString().split(idPrefix)[1])
    new_uid++;
    new_uid = idPrefix + new_uid;
    return new_uid;
}