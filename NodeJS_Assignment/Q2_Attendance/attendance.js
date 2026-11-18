const fs = require('fs');
const readline = require('readline');
const path = require('path');

const fileName = path.join(__dirname, 'attendance.txt');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, '');

function getNames() {
  return fs.readFileSync(fileName, 'utf8').split('\n').map(name => name.trim()).filter(Boolean);
}

function saveNames(names) {
  fs.writeFileSync(fileName, names.join('\n') + (names.length ? '\n' : ''));
}

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  while (true) {
    console.log('\n--- Student Attendance ---');
    console.log('1. Add student');
    console.log('2. Show all students');
    console.log('3. Update student name');
    console.log('4. Delete student');
    console.log('5. Exit');
    const choice = (await ask('Enter your choice: ')).trim();
    const names = getNames();

    if (choice === '1') {
      const name = (await ask('Enter student name: ')).trim();
      if (!name || name.includes('\n')) console.log('Please enter a valid name.');
      else if (names.some(n => n.toLowerCase() === name.toLowerCase())) console.log('Student already exists.');
      else { names.push(name); saveNames(names); console.log('Student added.'); }
    } else if (choice === '2') {
      if (!names.length) console.log('No students in the file.');
      else names.forEach((name, index) => console.log(`${index + 1}. ${name}`));
    } else if (choice === '3') {
      const oldName = (await ask('Enter existing name: ')).trim();
      const index = names.findIndex(n => n.toLowerCase() === oldName.toLowerCase());
      if (index === -1) console.log('Student not found.');
      else {
        const newName = (await ask('Enter new name: ')).trim();
        if (!newName || names.some((n, i) => i !== index && n.toLowerCase() === newName.toLowerCase())) {
          console.log('Invalid or duplicate name.');
        } else { names[index] = newName; saveNames(names); console.log('Name updated.'); }
      }
    } else if (choice === '4') {
      const name = (await ask('Enter name to delete: ')).trim();
      const index = names.findIndex(n => n.toLowerCase() === name.toLowerCase());
      if (index === -1) console.log('Student not found.');
      else { names.splice(index, 1); saveNames(names); console.log('Student deleted.'); }
    } else if (choice === '5') {
      console.log('Goodbye!');
      break;
    } else console.log('Invalid choice. Try again.');
  }
  rl.close();
}

main().catch(error => { console.error(error); rl.close(); });
