export default function wrap(Type, fn, dontCloneWithNoArgs) {
    return function () {
        var m;
        if (dontCloneWithNoArgs && !arguments.length) {
            m = this;
        } else {
            m = new Type(this);
        }
        return fn.apply(m, arguments);
    };
}
