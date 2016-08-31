document.addEventListener("DOMContentLoaded", function(evt) {
    moment.locale('fr')
    var now = document.getElementById("now")
    now.innerHTML = moment().format('LLL')
    var start = document.getElementById("start")
    start.innerHTML = moment().format('LTS');   // for LT and LTS
})
