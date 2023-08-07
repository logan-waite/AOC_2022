import { chunk, pipe, splitString, map } from "../utils.js";

function getCommandList(cmdString) {
    return cmdString.split("\n").map((cmd) => {
        const [move, from, to] = cmd.split(" ").filter((x) => parseInt(x));
        return { move: parseInt(move), from: from - 1, to: to - 1 };
    });
}

function getInitialSetup(initialString) {
    const rows = initialString.split("\n").map((r) => {
        const row = pipe(
            splitString(""),
            chunk(4),
            map((stack) => stack[1])
        )(r);
        return row;
    });
    const stacks = rows.slice(0, -1).reduce((result, row) => {
        row.forEach((crate, i) => {
            if (crate != " ") {
                result[i] ? result[i].push(crate) : (result[i] = [crate]);
            }
        });
        return result;
    }, []);
    return stacks;
}

function formatInput(input) {
    const [rawInitial, rawCommands] = input.split("\n\n");
    const commands = getCommandList(rawCommands);
    const initial = getInitialSetup(rawInitial);
    return { initial, commands };
}

function moveCrates(reversed, stacks, cmd) {
    const pickedCrates = stacks[cmd.from].splice(0, cmd.move);
    if (reversed) {
        pickedCrates.reverse();
    }
    stacks[cmd.to].unshift(...pickedCrates);
    return stacks;
}

export function part1(input) {
    const { initial, commands } = formatInput(input);
    const finishedStacks = commands.reduce(
        moveCrates.bind(null, true),
        initial
    );
    const topCrates = finishedStacks.map((c) => c[0] ?? " ").join("");
    return topCrates;
}

export function part2(input) {
    const { initial, commands } = formatInput(input);
    const finishedStacks = commands.reduce(
        moveCrates.bind(null, false),
        initial
    );
    const topCrates = finishedStacks.map((c) => c[0] ?? " ").join("");
    return topCrates;
}

// ^\s?(?:\[(\w)\])\s(?:\[(\w)\])\s(?:\[(\w)\])?\s?$
