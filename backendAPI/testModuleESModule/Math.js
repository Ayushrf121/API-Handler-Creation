// why default export is used? because we can only have one default export in a file and we can import it with any name we want. but for named exports we have to import them with the same name as they are exported.

export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}

export default function multiply(a, b) {
    return a * b;
}