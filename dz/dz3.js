/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    const res = [];
    const length = array.length;

    for (let i = 0; i < length; i++) {
        res.push(fn(array[i], i, array));
    }

    return res;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    const length = array.length;
    let res = initial;
    let firstIndex = 0;

    if (typeof initial === 'undefined') {
        res = array[0];
        firstIndex = 1;
    }

    for (let i = firstIndex; i < length; i++) {
        res = fn(res, array[i], i, array);
    }

    return res;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    return Object.keys(obj).map((item) => item.toUpperCase());
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    const length = array.length;
    const res = [];

    if (from < -length || typeof from === 'undefined') {
        from = 0;
    } else if (from < 0) {
        from += length;
    }

    if (to > length || typeof to === 'undefined') {
        to = length;
    } else if (to < 0) {
        to += length;
    }
  
    for (let i = from; i < to; i++) {
        res.push(array[i]);
    }

    return res;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
