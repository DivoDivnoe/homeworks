import myList from './my-list.js';

const setSaveHandler = () => {
    document.querySelector('.app__save').addEventListener('click', () => {
        localStorage.customFriendsList = JSON.stringify(myList.getCustomFriendsList());
        alert('Сохранено');
    });
};

export default setSaveHandler;
