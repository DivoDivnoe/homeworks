/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    const div = document.createElement('DIV');

    const getRandomNumber = (limit) => Math.floor(Math.random() * (limit + 1));

    const getRandomColor = () => `rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(255)})`;
    const dimensions = {
        width: getRandomNumber(100),
        height: getRandomNumber(100)
    };
    const coords = {
        left: getRandomNumber(100 - dimensions.width) + '%',
        top: getRandomNumber(100 - dimensions.height) + '%'
    };

    div.style.position = 'absolute';
    div.style.backgroundColor = getRandomColor();
    div.style.width = dimensions.width + '%';
    div.style.height = dimensions.height + '%';
    div.style.left = coords.left;
    div.style.top = coords.top;
    div.classList.add('draggable-div');

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    const dragDivHandler = (evt) => {
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        const mouseMoveHandler = (moveEvt) => {
            const shift = {
                x: moveEvt.clientX - startCoords.x,
                y: moveEvt.clientY - startCoords.y
            };


            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            target.style.left = target.offsetLeft + shift.x + 'px';
            target.style.top = target.offsetTop + shift.y + 'px';
        };
        const mouseUpHandler = () => {
            target.removeEventListener('mousemove', mouseMoveHandler);
            target.removeEventListener('mouseup', mouseUpHandler);
        };

        target.addEventListener('mousemove', mouseMoveHandler);
        target.addEventListener('mouseup', mouseUpHandler);
    };

    target.addEventListener('mousedown', dragDivHandler);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

/*export {
    createDiv
};*/
