import { readFileSync } from 'fs';
import { createServer } from 'https';
import Sum from './Sum';
import Decryptor from './Decryptor';

console.log("Here we go!");
const key = readFileSync('./localhost.key');
const cert = readFileSync('./localhost.crt');

createServer({ key, cert }, (req, response) => {
  // task 1
  try {
    const crypt = new Decryptor('./secret.key', './iv.txt', './auth.txt');
    crypt.encrypt('./secret.enc');
  } catch (err) {
  }

  // task 2
  const file = readFileSync('./clear_smaller.txt', 'utf8');
  const sumTask2 = Sum.sumNumbersInString(file);
  console.log('The result of task 2 is', sumTask2);

  // task 3
  const sumTask3 = Sum.sumVowelsInString(file) + sumTask2;
  console.log('The result of task 3 is', sumTask3);

  // task 4
  const sentences = file.split('.');
  const numbersInSentences = sentences.map((sentence) => Sum.sumNumbersInString(sentence));
  const numbersToFilter = [...numbersInSentences].sort((a, b) => b - a).slice(0, 10);
  const numbersInOrder = numbersInSentences.filter((num) => numbersToFilter.includes(num))
  const result = numbersInOrder.map((number, index) => number - index);

  const solution = result.reduce((solution, charCode) => solution + String.fromCharCode(charCode), '');

  response.statusCode = 200;
  response.end(solution);
})
  .listen(8000, () => {
    console.log('Server started');
  });
