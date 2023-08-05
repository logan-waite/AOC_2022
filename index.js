import { readFile } from "node:fs/promises";

import { getArguments, getDirname, printInGreen, printInRed } from "./utils.js";

const argumentList = ["day", "part", "test"];

async function getInput(basePath, test) {
    const path = basePath + (test ? "test.txt" : "input.txt");
    try {
        return await readFile(path, {
            encoding: "utf-8",
        });
    } catch (e) {
        console.error(printInRed(`Cannot find file at ${path}!`));
        return;
    }
}

async function main() {
    const args = getArguments(argumentList);
    const __dirname = getDirname(import.meta.url);

    if (!args.day) {
        throw Error("`day` is a required argument!");
    }

    const basePath = `${__dirname}/day_${args.day}/`;
    const dayModule = await import(basePath + "index.js");

    // --------

    const input = await getInput(basePath, args.test);
    if (!input) {
        return 1;
    }

    const funcName = `part${args.part ?? "1"}`;
    const result = dayModule[funcName](input);

    console.log(result);
}

main();
