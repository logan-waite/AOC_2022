function sum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

function calculateCalorieTotals(elves) {
    return elves
        .map((food) => food.split("\n"))
        .map((food) => food.map((cals) => parseInt(cals)))
        .map(sum);
}

export function part1(input) {
    console.log("part 1");
    const elfCalories = input.split("\n\n");
    const totals = calculateCalorieTotals(elfCalories);
    return Math.max(...totals);
}

export function part2(input) {
    console.log("part 2");
    const totals = calculateCalorieTotals(input.split("\n\n"));

    const topThree = totals
        // .filter((_, i) => i < 4)
        .reduce(
            (top, current) => {
                const s = top.filter((t) => t < current);
                if (s.length > 0) {
                    const smallestNumber = Math.min(...s);
                    const smallestIndex = top.findIndex((x, i, a) => {
                        return x === smallestNumber;
                    });
                    top.splice(smallestIndex, 1, current);
                }
                return top;
            },
            [0, 0, 0]
        );

    return sum(topThree);
}
