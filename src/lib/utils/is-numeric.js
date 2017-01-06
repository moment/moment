export default function isNumeric(val) {
    var _val = +val;
    return (val !== val + 1) && //infinity check
           (_val === +val) && //Cute coercion check
           (typeof val !== 'object'); //Array/object check
}
