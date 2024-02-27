import moment from 'moment'
const dateFormat1 = (date) => {
    if (!date) return '';
    return moment(date).format("DD/MM/YYYY");
}

const timeFormat1 = (date) => {
    if (!date) return '';
    return moment(date).format("h.mm A");
}

export { dateFormat1, timeFormat1 }