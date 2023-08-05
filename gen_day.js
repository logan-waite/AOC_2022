import { writeFile, mkdir } from "node:fs/promises";
import { getArguments, getDirname, printInRed } from "./utils.js";

const fileStub = `export function part1(input) {
    return "part1 has not been implemented";
}

export function part2(input) {
    return "part2 has not been implemented";
}`;

async function run() {
    const args = getArguments(["day"]);
    const __dirname = getDirname(import.meta.url);

    if (!args.day) {
        throw Error("`day` is a required argument!");
    }

    const basePath = __dirname + `/day_${args.day}/`;

    try {
        // make day_x directory
        await mkdir(basePath);

        // create empty files for input.txt and test.txt
        await writeFile(basePath + "input.txt", "");
        await writeFile(basePath + "test.txt", "");

        // create index.js file with stubbed
        await writeFile(basePath + "index.js", fileStub);
    } catch (e) {
        printInRed("Unable to generate files");
        throw Error(e);
    }
}

run();
