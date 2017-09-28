import myList from './my-list.js';
import { mainList, customList } from './elements';

export const renderFriends = () => {
    renderList(myList.getMainFriendsList(), mainList);
    mainList.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'SPAN') {
            return false;
        }

        const movedItem = evt.target.parentElement;
        const movedData = myList.getMainFriendsList().find((item) => {
            return item.photo_100 === movedItem.querySelector('img').src;
        });

        myList.moveFromMainToCustom(movedData);
        customList.appendChild(movedItem);
    });

    renderList(myList.getCustomFriendsList(), customList);
    customList.addEventListener('click', (evt) => {
        if (evt.target.tagName !== 'SPAN') {
            return false;
        }

        const movedItem = evt.target.parentElement;
        const movedData = myList.getCustomFriendsList().find((item) => {
            return item.photo_100 === movedItem.querySelector('img').src;
        });

        myList.moveFromCustomToMain(movedData);
        mainList.appendChild(movedItem);
    });
};

export const renderList = (list, element) => {
    const template = document.querySelector('#user-template').innerHTML;
    const render = Handlebars.compile(template);

    const html = render({
        friends: list
    });

    element.innerHTML = html;
}
