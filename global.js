// const name = 'yoshi';

// console.log(name);

const greet = (name) => {
  console.log(`hello, ${name}`);
};

greet('mario');
greet('yoshi');

// console.log(global); // global object   

setTimeout(() => {
  console.log('in the timeout');
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('in the interval');
    }
, 1000);

console.log(__dirname);
console.log(__filename);

