function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    throw new Error(`${response.status} ${response.statusText} - ${response.url}`);
}

export {
    checkStatus,
};
