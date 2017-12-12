import reqwest from 'reqwest';

export function getJson(obj, successHandler, errorHandler) {
    return reqwest({
        url: obj.url,
        method: 'GET',
        type: 'json',
        contentType: 'application/json',
    }).then(successHandler, errorHandler);
}

export function postJson(obj, successHandler, errorHandler) {
    return reqwest({
        url: obj.url,
        method: "POST",
        contentType: obj.contentType,
        data: obj.data,
    })
    .then(successHandler, errorHandler);
}
