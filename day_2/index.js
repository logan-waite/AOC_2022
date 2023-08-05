function prepInput(input) {
    return input.split("\n").map((turn) => turn.split(" "));
}

const RpsEnum = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors",
};

const scoreEnum = {
    [RpsEnum.ROCK]: 1,
    [RpsEnum.PAPER]: 2,
    [RpsEnum.SCISSORS]: 3,
};

function playRPS(player1, player2) {
    if (player1 === RpsEnum.ROCK) {
        if (player2 === RpsEnum.ROCK) {
            return 0;
        } else if (player2 === RpsEnum.PAPER) {
            return 2;
        } else if (player2 === RpsEnum.SCISSORS) {
            return 1;
        }
    } else if (player1 === RpsEnum.PAPER) {
        if (player2 === RpsEnum.ROCK) {
            return 1;
        } else if (player2 === RpsEnum.PAPER) {
            return 0;
        } else if (player2 === RpsEnum.SCISSORS) {
            return 2;
        }
    } else if (player1 === RpsEnum.SCISSORS) {
        if (player2 === RpsEnum.ROCK) {
            return 2;
        } else if (player2 === RpsEnum.PAPER) {
            return 1;
        } else if (player2 === RpsEnum.SCISSORS) {
            return 0;
        }
    }
}

function calculateScore(turns, result) {
    let score1 = scoreEnum[turns[0]];
    let score2 = scoreEnum[turns[1]];

    // loss = +0, draw = +3, win = +6
    switch (result) {
        case 0:
            score1 += 3;
            score2 += 3;
            break;
        case 1:
            score1 += 6;
            break;
        case 2:
            score2 += 6;
            break;
    }

    return { score1, score2 };
}

export function part1(input) {
    const strategyMap = {
        A: RpsEnum.ROCK,
        B: RpsEnum.PAPER,
        C: RpsEnum.SCISSORS,
        X: RpsEnum.ROCK,
        Y: RpsEnum.PAPER,
        Z: RpsEnum.SCISSORS,
    };

    const rounds = prepInput(input);
    const score = rounds
        .map((round) => round.map((play) => strategyMap[play]))
        .reduce(
            (score, turns) => {
                const result = playRPS(...turns);
                const { score1, score2 } = calculateScore(turns, result);

                score.p1 += score1;
                score.p2 += score2;
                return score;
            },
            { p1: 0, p2: 0 }
        );

    return score.p2;
}

const StratEnum = {
    WIN: "win",
    LOSE: "lose",
    DRAW: "draw",
};

const strategyMap = {
    X: StratEnum.LOSE,
    Y: StratEnum.DRAW,
    Z: StratEnum.WIN,
};

function doStrategy(strat, turn) {
    switch (strat) {
        case StratEnum.WIN:
            return turn === RpsEnum.ROCK
                ? RpsEnum.PAPER
                : turn === RpsEnum.PAPER
                ? RpsEnum.SCISSORS
                : turn === RpsEnum.SCISSORS
                ? RpsEnum.ROCK
                : "";
        case StratEnum.DRAW:
            return turn === RpsEnum.ROCK
                ? RpsEnum.ROCK
                : turn === RpsEnum.PAPER
                ? RpsEnum.PAPER
                : turn === RpsEnum.SCISSORS
                ? RpsEnum.SCISSORS
                : "";
        case StratEnum.LOSE:
            return turn === RpsEnum.ROCK
                ? RpsEnum.SCISSORS
                : turn === RpsEnum.PAPER
                ? RpsEnum.ROCK
                : turn === RpsEnum.SCISSORS
                ? RpsEnum.PAPER
                : "";
    }
}

export function part2(input) {
    const playMap = {
        A: RpsEnum.ROCK,
        B: RpsEnum.PAPER,
        C: RpsEnum.SCISSORS,
    };

    const result = prepInput(input)
        .map(([player1Turn, player2Turn]) => {
            const player1 = playMap[player1Turn];
            const player2 = doStrategy(strategyMap[player2Turn], player1);
            return [player1, player2];
        })
        .reduce(
            (score, turns) => {
                const result = playRPS(...turns);
                const { score1, score2 } = calculateScore(turns, result);

                score.p1 += score1;
                score.p2 += score2;
                return score;
            },
            { p1: 0, p2: 0 }
        );
    return result.p2;
}
