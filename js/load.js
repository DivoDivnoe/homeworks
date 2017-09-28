export default (method, params) => {
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.response) {
                resolve(data.response.items);
            } else {
                reject(new Error(data.error.errorMessage));
            }
        });
    });
};

