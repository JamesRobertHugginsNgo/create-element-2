export default function suffix(value, suffix) {
    if (value == null) {
        return;
    }
    return `${value}${suffix}`;
}