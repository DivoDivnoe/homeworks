'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.querySelector('.friends__list--all');

    const api = (method, params) => {
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

    const renderFriends = (list) => {
        const template = document.querySelector('#user-template').innerHTML;
        const render = Handlebars.compile(template);
        const html = render({
            friends: list
        });

        friendsList.innerHTML = html;
    };
    
    new Promise((resolve, reject) => {
        VK.init({
            apiId: 6190738
        });

        VK.Auth.login((data) => {
            if (data.session) {
                resolve(data);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    })
        .then(() => {
            return api('friends.get', {
                fields: 'first_name, last_name, photo_100',
                v: 5.68
            });
        })
        .then((list) => renderFriends(list))
        .catch((evt) => alert(evt.message));

    //VK.Auth.revokeGrants();
});