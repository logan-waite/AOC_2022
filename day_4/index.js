import { intersection, pipe, range } from "../utils.js";

function createRanges(input) {
    return input.split("\n").map((pair) => {
        const ranges = pair.split(",").map((ends) => {
            const [start, end] = ends.split("-").map((i) => parseInt(i));
            return range(start, end);
        });
        return ranges;
    });
}

export function part1(input) {
    const pairs = createRanges(input);

    const result = pairs.filter((ranges) => {
        const shared = intersection(ranges[0], ranges[1]);
        return (
            shared.length === ranges[0].length ||
            shared.length === ranges[1].length
        );
    });

    return result.length;
}

export function part2(input) {
    const ranges = createRanges(input);
    const result = ranges.filter(
        (ranges) => intersection(ranges[0], ranges[1]).length > 0
    );
    return result.length;
}
