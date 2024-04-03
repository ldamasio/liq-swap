const fs = require('fs');
const path = require('path');

const testFiles = [
  './currencyConvert.test.js',
  './listSymbols.test.js',
];

const extractTestNames = () => {
  const testNames = [];

  testFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const regex = /it\(['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
      testNames.push(match[1]);
    }
  });

  return testNames;
};

const testNames = extractTestNames();

console.log('Lista de Testes:');
testNames.forEach((name, index) => {
  console.log(`${index + 1}. ${name}`);
});