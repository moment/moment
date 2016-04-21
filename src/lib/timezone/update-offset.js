export default function updateOffset (instance, keepLocalTime) {
    var oldOffset = instance._offset || 0;
    var newOffset = instance._z.parse(+instance._d);
    if (oldOffset !== newOffset && !keepLocalTime) {
        instance._d.setTime(+instance._d + (newOffset - oldOffset) * 60000);
    }
    instance._offset = newOffset;
    return instance;
}
