export default function mergeValues(value1, value2) {
    if (value2 === undefined) {
        return value1;
    }

    if (typeof value1 === 'function' && typeof value2 === 'function') {
        return function(...args) {
            value1.call(this, ...args);
            value2.call(this, ...args);
        }
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
        const value = [];
        const length = Math.max(value1.length, value2.length);
        for (let index = 0; index < length; index++) {
            value.push(mergeValues(value1[index], value2[index]));
        }
        return value;
    }

    if (
        value1 && typeof value1 === 'object' && !Array.isArray(value1)
        && value2 && typeof value2 === 'object' && !Array.isArray(value2)
    ) {
        const value = {};
        const keys = [].concat(Object.keys(value1), Object.keys(value2));
        for (key of keys) {
            value[key] = mergeValues(value1[key], value2[key]);
        }
        return value;
    }

    return value2;
}
