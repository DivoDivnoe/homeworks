const auth = (id) => {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: id
        });

        VK.Auth.login((data) => {
            if (data.session) {
                resolve(data);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
};

export default auth;