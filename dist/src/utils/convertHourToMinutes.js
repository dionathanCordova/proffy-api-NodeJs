"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertHourToMinutes(time) {
    var _a = time.split(':').map(Number), hour = _a[0], minutes = _a[1];
    return (hour * 60) + minutes;
}
exports.default = convertHourToMinutes;
