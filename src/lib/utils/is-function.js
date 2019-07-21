export default function isFunction(input) {
    return Function !== undefined && input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}
