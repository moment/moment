$("pre.js").snippet("javascript", {style:"typical",showNum:false});
moment.lang('en');
$('#js-format-now').html('"' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a') + '"');
$('#js-from-now').html('"' + moment([2011, 9, 31]).fromNow() + '"');
$('#js-add').html('"' + moment().add('days', 9).format('dddd, MMMM Do YYYY') + '"');
moment.lang('fr');
$('#js-lang').html('"' + moment().format('LLLL') + '"');
moment.lang('en');