import myList from './my-list.js';
import { mainFilter, customFilter, mainList, customList } from './elements';
import { renderList } from './render';

const filterList = (evt, list) => {
    const target = evt.target;
    const value = target.value.toLowerCase().trim();
    const filteredList = list.filter((item) => {
        return item.first_name.toLowerCase().includes(value) || item.last_name.toLowerCase().includes(value);
    });

    return filteredList;
};

const filterHandler = (evt, list, block) => {
    const filteredList = filterList(evt, list);

    block.innerHTML = '';
    renderList(filteredList, block);
};

const setFilters = () => {
    mainFilter.addEventListener('keyup', (evt) => {
        filterHandler(evt, myList.getMainFriendsList(), mainList);
    });

    customFilter.addEventListener('keyup', (evt) => {
        filterHandler(evt, myList.getCustomFriendsList(), customList);
    });
};

export default setFilters;
