function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

export const initDate = () => {
    const today = new Date();
    return today.getUTCFullYear() +
        '-' + pad(today.getUTCMonth() + 1) +
        '-' + pad(today.getUTCDate())
}