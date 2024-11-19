for (let i = 1; i <= 100; i++) {
    let result = '';

    if (i % 3 === 0) result += 'Fizz';
    if (i % 5 === 0) result += 'Buzz';

    console.log(result || i);
}

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }

    return true;
}

function nextPrime(n) {
    n = Math.max(n, 2); // Ensure n is at least 2

    while (!isPrime(n)) {
        n++;
    }

    return n;
}

// Test the function
console.log(nextPrime(10)); // Should print 11
console.log(nextPrime(100)); // Should print 101
console.log(nextPrime(1000000)); // Should print 1000007


function parseCSV(csvString) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuote = false;

    for (let i = 0; i < csvString.length; i++) {
        const char = csvString[i];

        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            currentCell += char;
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if (char === '\r' && i + 1 < csvString.length && csvString[i + 1] === '\n') {
            currentCell += char + csvString[++i]; // Consume the \n
            currentRow.push(currentCell.trim());
            rows.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }

    // Handle the last row if present
    if (currentRow.length > 0) {
        rows.push(currentRow);
    }

    return rows;
}

// Test the function
const csvString = `
    ID,Name,Occupation,Age
    42,Bruce,Knight,41
    57,Bob,Fry Cook,19
    63,Blaine,Quiz Master,58
    98,Bill,Doctor's Assistant,26
`;

console.log(parseCSV(csvString));
