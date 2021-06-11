export const AVAILABLE_LANGUAGE=['RU','KZ', 'EN'];
export function setLanguages(RU, KZ, EN) {
    const setTranslate = {};
    AVAILABLE_LANGUAGE.forEach((lang, index) => setTranslate[lang] = arguments[index] || arguments[0])
    return setTranslate
}


export const INTERFACE_LANGUAGE={
    add:setLanguages('Добавить','Косу','Add'),
    cancel:setLanguages('Отмена', 'Күшін жою','Cancel'),
    delete:setLanguages('Удалить', 'Жою','Delete'),
    enter:setLanguages('Вход','Кіру','Login'),
    exit:setLanguages('Выход', 'Шығу','Logout'),
    filter:setLanguages('Фильтр', 'Фильтр','Filter'),
    handbook: setLanguages('Справочник', 'Анықтамалық','Handbook'),
    login:setLanguages('Логин','Логин','Login'),
    password:setLanguages('Пароль','Пароль','Password'),
    save:setLanguages('Сохранить', 'Сақтау','Save'),
    selected:setLanguages('Выбрано','Таңдалған','Selected'),
    update:setLanguages('Изменить', 'Өңдеу','Update'),
}

export const INTERFACE_DIALOG={
    loginModal:setLanguages('Авторизация пользователя','Пайдаланушының авторизациясы', 'User authorization'),
    successDeleteModal:setLanguages('Успешно удален','Сәтті жойылды', 'Successfully deleted'),
    successSaveModal:setLanguages('Успешно сохранен','Сәтті сақталды', 'Successfully saved'),
    invalidRequiredField:setLanguages('Введите обязательные поля','Кажетті өрістерді енгізіңіз','Enter required fields'),
    noResultsFound:setLanguages('Результатов не найдено', 'Нәтиже табылмады', 'No results found')
}
