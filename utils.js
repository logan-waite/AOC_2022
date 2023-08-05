import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// CLI tools
export function getArguments(argumentList) {
    function getArgument(arg) {
        const [_, argument, value] = arg.match(/--(\w+)=?(.*)/);
        if (!argumentList.includes(argument)) {
            throw Error(
                `"${argument}" is not one of the accepted arguments (${argumentList})`
            );
        }
        return { [argument]: value || true };
    }

    const args = process.argv.filter((a, i) => i > 1).map(getArgument);

    return listToObject(args);
}

export function getDirname(url) {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    return __dirname;
}

export function printInColor(color) {
    const escapeMap = {
        reset: "\x1b[0m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
    };
    return function _print(string) {
        console.log(escapeMap[color] + string + escapeMap.reset);
    };
}

export const printInRed = printInColor("red");
export const printInGreen = printInColor("green");

// General

export function listToObject(arr) {
    return arr.reduce((obj, cur) => {
        const [key] = Object.keys(cur);
        obj[key] = cur[key];
        return obj;
    }, {});
}

export function createArray(length, fill) {
    const list = Array(length);
    if (typeof fill === "function") {
        return list.fill(0).map(fill);
    } else {
        return list.fill(fill);
    }
}

export function intersection(list1, list2) {
    return list1.filter((x) => list2.includes(x));
}

export function unique(list) {
    return [...new Set(list)];
}

export function sum(numbers) {
    return numbers.reduce((sum, num) => {
        return sum + num;
    });
}

export function pipe(...fns) {
    return function _piped(initial) {
        return fns.reduce((val, fn) => fn(val), initial);
    };
}

export function splitString(delimiter) {
    return function _splitter(string) {
        return string.split(delimiter);
    };
}

export function chunk(chunkSize) {
    return function _chunker(list) {
        return list.reduce((result, cur, i) => {
            const lastChunk = result.length > 0 ? result.slice(-1)[0] : [];
            const isExistingChunk = lastChunk.length < chunkSize;
            const workingChunk = isExistingChunk ? lastChunk : [];
            workingChunk.push(cur);
            if (!isExistingChunk) {
                result.push(workingChunk);
                return result;
            } else {
                return result.toSpliced(-1, 1, workingChunk);
            }
        }, []);
    };
}

export function map(func) {
    return function _mapper(list) {
        return list.map(func);
    };
}

export function tap(val) {
    console.log({ val });
    return val;
}

export function flatten(list) {
    return list.flat();
}

export function range(start, end) {
    if (start === end) {
        return [start];
    }
    return createArray(end - start + 1, (_, i) => i + start);
}
