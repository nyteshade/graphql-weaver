export function objectValues(obj: {[name: string]: any}): any[] {
    return Object.keys(obj).map(i => obj[i]);
}

export function objectEntries(obj: {[name: string]: any}): any[] {
    return Object.keys(obj).map(k => [k, obj[k]]);
}

export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function maybeDo<TIn, TOut>(input: TIn|undefined, fn: (input: TIn) => TOut): TOut|undefined {
    if (!input) {
        return input;
    }
    return fn(input);
}

export function arrayToObject<TValue>(array: TValue[], keyFn: (obj: TValue) => string): {[name: string]: TValue} {
    const result: {[name: string]: TValue} = {};
    for (const item of array) {
        result[keyFn(item)] = item;
    }
    return result;
}

export function objectToMap<T>(object: {[name: string]: T}): Map<string, T> {
    return new Map<string, T>(objectEntries(object));
}

export function mapValues<TIn, TOut>(obj: {[key: string]: TIn}, fn: (input: TIn) => TOut): {[key: string]: TOut} {
    const result: {[key: string]: TOut} = {};
    for (const key in obj) {
        result[key] = fn(obj[key]);
    }
    return result;
}

/**
 * Creates a new Map by changing the keys but leaving the values as-is
 * @param map a map
 * @param fn a function that gets an old key and returns the new key
 * @returns the new map
 */
export function mapMapKeys<TKey, TNewKey, TValue>(map: Map<TKey, TValue>, fn: (key: TKey) => TNewKey): Map<TNewKey, TValue> {
    const newMap = new Map<TNewKey, TValue>();
    for (const [key, value] of map) {
        newMap.set(fn(key), value);
    }
    return newMap;
}

export function flatten<T>(input: T[][]): T[] {
    const arr: T[] = [];
    return arr.concat(...input);
}

export function flatMap<TIn, TOut>(input: TIn[], fn: (input: TIn) => TOut[]): TOut[] {
    return flatten(input.map(fn));
}
