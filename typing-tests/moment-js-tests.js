// @ts-check

// Ensure can instantiate moment
console.log(moment().toString());

// Ensure can refer to type: moment.Moment
function cloneMoment(/** @type moment.Moment */m) {
    return moment(m);
}
cloneMoment(moment());
