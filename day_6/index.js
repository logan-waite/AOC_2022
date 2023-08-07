import { unique } from "../utils.js";

function findFirstSegmentOfUniqueLetters(number) {
    return function _reducer(result, _, i, array) {
        if (result > 0) return result;
        const endChar = i + number;
        const uniqueLetters = unique(array.slice(i, endChar));
        return uniqueLetters.length === number ? endChar : 0;
    };
}

export function part1(input) {
    const index = Array.from(input).reduce(findFirstSegmentOfUniqueLetters(4));
    return index;
}

export function part2(input) {
    const index = Array.from(input).reduce(findFirstSegmentOfUniqueLetters(14));
    return index;
}
