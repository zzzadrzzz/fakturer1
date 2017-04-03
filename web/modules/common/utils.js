function timestampToStringDate(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = pad2Digits(date.getMonth()+1);
    var day = pad2Digits(date.getDate());
    var hours = pad2Digits(date.getHours());
    var seconds = pad2Digits(date.getMinutes());
    return year + '.' + month + '.' + day + ' ' + hours + ':' + seconds;
}

function pad2Digits(input) {
    return input < 10 ? '0' + input : input;
}