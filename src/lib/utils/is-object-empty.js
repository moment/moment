export default function isObjectEmpty(obj) {
    if (Object.keys) {
        return (Object.keys(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            // even if its not own property I'd still call it non-empty
            return false;
        }
        return true;
    }
}
