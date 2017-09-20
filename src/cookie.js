/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
const homeworkContainer = document.querySelector('#homework-container');
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
const addNameInput = homeworkContainer.querySelector('#add-name-input');
const addValueInput = homeworkContainer.querySelector('#add-value-input');
const addButton = homeworkContainer.querySelector('#add-button');
const listTable = homeworkContainer.querySelector('#list-table tbody');

const parseCookie = () => {
    const result = [];

    if (document.cookie) {
        document.cookie.split('; ').forEach((item) => {
            const [name, value] = item.split('=');
            const obj = {};

            obj[name] = value;
            result.push(obj);
        });
    }

    return result;
};

let cookie = parseCookie();

filterNameInput.addEventListener('keyup', () => renderList(filterCookie()));

const filterCookie = () => {
    const value = filterNameInput.value;

    return cookie.filter((item) => {
        const cookieName = Object.keys(item)[0];

        return cookieName.includes(value) || item[cookieName].includes(value);
    });
};

const renderList = (list) => {
    listTable.innerHTML = '';
    const fragment = document.createDocumentFragment();

    list.forEach((item) => {
        const row = document.createElement('tr');
        const cellName = document.createElement('td');
        const cellValue = document.createElement('td');
        const cellDelete = document.createElement('td');
        const deleteButton = document.createElement('button');
        const cookieName = Object.keys(item)[0];

        cellName.textContent = cookieName;
        cellValue.textContent = item[cookieName];
        cellDelete.appendChild(deleteButton);
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            const past = new Date();

            past.setYear(2016);
            document.cookie = `${cookieName}=;expires=${past}`;
            cookie = parseCookie();
            renderList(filterCookie());
        });

        [cellName, cellValue, cellDelete].forEach((cell) => row.appendChild(cell));
        fragment.appendChild(row);
    });

    listTable.appendChild(fragment);
}

addButton.addEventListener('click', () => {
    const name = addNameInput.value;
    const value = addValueInput.value;

    document.cookie = `${name}=${value}`;
    cookie = parseCookie();
    renderList(filterCookie());
});

renderList(filterCookie());