import myList from './my-list.js';
import { mainList, customList } from './elements';

const dragAndDrop = () => {
    let draggedItem = null;

    const setDragAndDropHandler = (startContainer, dropContainer, dropHandler) => {
        startContainer.addEventListener('dragstart', (evt) => {
            if (evt.target.tagName === 'LI') {
                draggedItem = evt.target;
                const name = draggedItem.querySelector('.friends__name').textContent;

                evt.dataTransfer.setData('text/html', name);
            }
        });

        dropContainer.addEventListener('dragover', (evt) => evt.preventDefault());
        dropContainer.addEventListener('dragenter', (evt) => evt.preventDefault());
        dropContainer.addEventListener('dragleave', (evt) => evt.preventDefault());
        dropContainer.addEventListener('drop', () => {
            if (draggedItem && draggedItem.parentElement !== dropContainer) {
                dropHandler(draggedItem);
                dropContainer.appendChild(draggedItem);
                draggedItem = null;
            }
        });
    };

    setDragAndDropHandler(mainList, customList, (movedData) => {
        const draggedData = myList.getMainFriendsList().find((item) => {
            return item.photo_100 === movedData.querySelector('img').src;
        });

        myList.moveFromMainToCustom(draggedData);
    });
    setDragAndDropHandler(customList, mainList, (movedData) => {
        const draggedData = myList.getCustomFriendsList().find((item) => {
            return item.photo_100 === movedData.querySelector('img').src;
        });

        myList.moveFromCustomToMain(draggedData);
    });
};

export default dragAndDrop;
