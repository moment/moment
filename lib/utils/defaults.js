// Pick the first defined of two or three arguments. dfl comes from default.
export default function defaults(a, b, c) {
    switch (arguments.length) {
        case 2: return a != null ? a : b;
        case 3: return a != null ? a : b != null ? b : c;
        default: throw new Error('Implement me'); // TODO: Fix
    }
}
