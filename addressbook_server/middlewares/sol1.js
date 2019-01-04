function solution(array, commands) {
    var answer = [];

    commands.forEach(element => {
        let temp = range(array, element[0], element[1]);
        temp.sort((a, b) => {
            return a - b;
        })

        for (let i = 0; i < temp.length; i++) {
            if (i === (element[2] - 1)) {
                answer.push(temp[i]);
            }
        }
    });

    return answer;
}

function range(array, from, to) {
    let result = [];
    for (let i = from - 1; i < to; i++) {
        result.push(array[i]);
    }
    return result;
};

const array = [1, 5, 2, 6, 3, 7, 4];
const commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]];

console.log(solution(array, commands));
