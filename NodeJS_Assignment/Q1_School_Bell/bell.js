const EventEmitter = require('events');

const schoolBell = new EventEmitter();

schoolBell.on('classStart', () => {
  console.log('The class has started. Please take your seats.');
});

schoolBell.on('classEnd', () => {
  console.log('The class is over. You may leave now.');
});

console.log('School bell system is ready.');

process.nextTick(() => {
  console.log('Ring bell! (process.nextTick)');
});

setTimeout(() => {
  console.log('Bell rang after 1 second. (setTimeout)');
  schoolBell.emit('classEnd');
}, 1000);

setImmediate(() => {
  console.log('Checking the bell system. (setImmediate)');
});

schoolBell.emit('classStart');
