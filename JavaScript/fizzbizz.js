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
// const csvString = `
//     ID,Name,Occupation,Age
//     42,Bruce,Knight,41
//     57,Bob,Fry Cook,19
//     63,Blaine,Quiz Master,58
//     98,Bill,Doctor's Assistant,26
// `;

// console.log(parseCSV(csvString));


function parseCSV(csvString) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuote = false;
    let numColumns = 0; // New variable to store the number of columns

    // Parse the first row to determine the number of columns
    const headerRow = csvString.split('\n')[0].split(',');
    numColumns = headerRow.length;

    // Parse each row
    for (let i = 1; i < csvString.split('\n').length - 1; i++) {
        const cells = csvString.split('\n')[i].split(',');

        // Trim each cell and add it to the current row
        cells.forEach(cell => {
            currentCell += cell.trim();

            if (currentCell.includes('"') && !inQuote) {
                inQuote = true;
            } else if (!currentCell.includes(',') && !inQuote) {
                currentRow.push(currentCell);
                currentCell = '';
            }
        });

        // Add the completed row to the result array
        rows.push(currentRow);

        currentRow = [];
        inQuote = false;
    }

    return [headerRow, ...rows];
}

// Test the function
const csvString = `
    ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26
    `;

const result = parseCSV(csvString);
console.log(result);

// Example usage with a different CSV string
const anotherCsvString = `
    Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232
    `;

const anotherResult = parseCSV(anotherCsvString);
console.log(anotherResult);

