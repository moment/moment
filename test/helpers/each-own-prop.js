import each from './each';
import objectKeys from './object-keys';

function eachOwnProp(object, callback) {
    each(objectKeys(object), callback);
}

export default eachOwnProp;
