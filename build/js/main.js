import auth from './auth';
import api from './load';
import myList from './my-list';
import { renderFriends } from './render';
import setFilters from './filter';
import dragAndDrop from './drag_and_drop';
import setSaveHandler from './save_list';
import setAppDragAndDrop from './window';

document.addEventListener('DOMContentLoaded', () => {
    setAppDragAndDrop();
    
    auth(6190738)
        .then(() => {
            return api('friends.get', {
                fields: 'first_name, last_name, photo_100',
                order: 'name',
                v: 5.68
            });
        })
        .then((list) => {
            myList.setMainFriendsList(list);
            myList.setCustomList();

            renderFriends();
            setFilters();
            dragAndDrop();
            setSaveHandler();
        })
        .catch((evt) => alert(evt.message));
});

//# sourceMappingURL=main.js.map
