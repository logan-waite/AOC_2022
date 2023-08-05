import {
    createArray,
    intersection,
    sum,
    unique,
    pipe,
    chunk,
    splitString,
    map,
    flatten,
    tap,
} from "../utils.js";

function createPriorityMap() {
    const numbers = createArray(52, (_, i) => i + 1);
    const upperLetters = createArray(26, (_, i) => String.fromCharCode(i + 65));
    const lowerLetters = createArray(26, (_, i) => String.fromCharCode(i + 97));
    const letters = lowerLetters.concat(upperLetters);
    return letters.reduce((map, letter, i) => {
        map[letter] = numbers[i];
        return map;
    }, {});
}

function halveString(str) {
    return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
}

export function part1(input) {
    const priorityMap = createPriorityMap();
    const priorities = input.split("\n").map((rucksack) => {
        return pipe(
            halveString,
            (r) => intersection(r[0].split(""), r[1].split("")),
            unique,
            (r) => priorityMap[r]
        )(rucksack);
    });
    const result = sum(priorities);

    return result;
}

export function part2(input) {
    const priorityMap = createPriorityMap();
    const result = pipe(
        splitString("\n"),
        chunk(3),
        map((group) =>
            group.reduce((item, rucksack, i, list) => {
                if (i === list.length - 1) {
                    return item;
                }

                const current = rucksack.split("");
                const next = list[i + 1].split("");
                const shared = intersection(current, next);
                if (item.length) {
                    return intersection(item, shared);
                } else {
                    return shared;
                }
            }, [])
        ),
        map(unique),
        flatten,
        map((r) => priorityMap[r]),
        sum
    )(input);

    return result;
}
