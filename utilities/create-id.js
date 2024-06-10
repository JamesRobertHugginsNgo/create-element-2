const ids = {};

export default function createId(prefix) {
    if (!ids[prefix]) {
        ids[prefix] = 0;
    }
    return `${prefix}${ids[prefix]++}`;
}