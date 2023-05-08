export function monthName(value) {
    if (!isNaN(value) && value <= 11) {
        const months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December',
        };
        return months[value];
    }
}

export function getMonthName() {
    return monthName(this.month());
}
