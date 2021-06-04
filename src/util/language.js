export const AVAILABLE_LANGUAGE=['RU','KZ', 'EN'];
export function setLanguages(RU, KZ, EN) {
    const setTranslate = {};
    AVAILABLE_LANGUAGE.forEach((lang, index) => setTranslate[lang] = arguments[index] || arguments[0])
    return setTranslate
}


export const INTERFACE_LANGUAGE={
    password:setLanguages('Пароль','Пароль','Password'),
    login:setLanguages('Логин','Логин','Login'),
    enter:setLanguages('Вход','Кіру','Login'),
    exit:setLanguages('Выход', 'Шығу','Logout'),
    save:setLanguages('Сохранить', 'Сақтау','Save'),
    delete:setLanguages('Удалить', 'Жою','Delete'),
    update:setLanguages('Изменить', 'Өңдеу','Update'),
    cancel:setLanguages('Отмена', 'Күшін жою','Cancel'),
}

export const INTERFACE_DIALOG={
    loginModal:setLanguages('Авторизация пользователя','Пайдаланушының авторизациясы', 'User authorization'),
    successDeleteModal:setLanguages('Успешно удален','Сәтті жойылды', 'Successfully deleted'),
    successSaveModal:setLanguages('Успешно сохранен','Сәтті сақталды', 'Successfully saved'),
}
