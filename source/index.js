"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const https_1 = require("https");
const Sum_1 = require("./Sum");
const Decryptor_1 = require("./Decryptor");
console.log("Here we go!");
const key = fs_1.readFileSync('./localhost.key');
const cert = fs_1.readFileSync('./localhost.crt');
https_1.createServer({ key, cert }, (req, response) => {
    // task 1
    try {
        const crypt = new Decryptor_1.default('./secret.key', './iv.txt', './auth.txt');
        crypt.encrypt('./secret.enc');
    }
    catch (err) {
    }
    // task 2
    const file = fs_1.readFileSync('./clear_smaller.txt', 'utf8');
    const sumTask2 = Sum_1.default.sumNumbersInString(file);
    console.log('The result of task 2 is', sumTask2);
    // task 3
    const sumTask3 = Sum_1.default.sumVowelsInString(file) + sumTask2;
    console.log('The result of task 3 is', sumTask3);
    // task 4
    const sentences = file.split('.');
    const numbersInSentences = sentences.map((sentence) => Sum_1.default.sumNumbersInString(sentence));
    const numbersToFilter = [...numbersInSentences].sort((a, b) => b - a).slice(0, 10);
    const numbersInOrder = numbersInSentences.filter((num) => numbersToFilter.includes(num));
    const result = numbersInOrder.map((number, index) => number - index);
    const solution = result.reduce((solution, charCode) => solution + String.fromCharCode(charCode), '');
    response.statusCode = 200;
    response.end(solution);
})
    .listen(8000, () => {
    console.log('Server started');
});
