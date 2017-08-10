import hasOwnProp from './has-own-prop';

export default function extend() {
    var args = [].slice.call(arguments),
        a = args[0],
        i, j, b;

    for (i = 1; i < args.length; ++i) {
        b = args[i];

        for (j in b) {
            if (hasOwnProp(b, j)) {
                a[j] = b[j];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }
    }

    return a;
}
