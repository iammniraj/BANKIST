'use strict';
/**
 *
 *!
 *?
 **
 *TODO

 */

//  ANCHOR - Used to indicate a section in your file
// TODO - An item that is awaiting completion
// FIXME - An item that requires a bugfix
// STUB - Used for generated   default snippets
// NOTE - An important note for a specific code section
// REVIEW - An item that requires additional review
// SECTION - Used to define a region (See 'Hierarchical anchors')
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

/* ---------------------------------------------------- */
/*SECTION USER NAME AND PASSWORD                       */
/* -------------------------------------------------- */
ACCOUNT: 1;
owner: 'Jonas Schmedtmann';
userID: Js;
pin: 1111;

ACCOUNT: 2;
owner: 'Jessica Davis';
userID: jd;
pin: 2222;

ACCOUNT: 2;
owner: 'Niraj Kumar Gautam';
userID: nkg;
pin: 3333;

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* --------------------- Displaying account transaction --------------------- */
const displayMovement = function (movement, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1}${type}
        </div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
          `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/* ------------------------- creating total balance ------------------------- */
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.innerHTML = `${acc.balance.toFixed(2)} EUR`;
};

/* ---------------------------- Creating user name ---------------------------- */

const createUserName = accs => {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);

/* -------------------------------- Update Ui ------------------------------- */
const updateUi = acc => {
  //display movements
  displayMovement(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};

/* --------------- Dispay summary {incoming outgoing and interest} ------------------ */

const calcDisplaySummary = acc => {
  const incoming = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(incoming);
  labelSumIn.textContent = `${incoming.toFixed(2)} €`;

  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing.toFixed(2))} €`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, ints) => acc + ints, 0);
  labelSumInterest.textContent = `${Math.abs(intrest.toFixed(2))} €`;
};

/* ---------------------------------- Login --------------------------------- */

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //greet user
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;

    //clear user and pin and focus
    inputLoginUsername.value = inputLoginPin.value = '';

    containerApp.style.opacity = 1;
    inputLoginPin.blur();

    // Display ui
    updateUi(currentAccount);
  }
});

/* ---------------------------- Transfer ballance --------------------------- */

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  // console.log(amount, receiverAc);

  if (
    amount > 0 &&
    receiverAc &&
    currentAccount.balance >= amount &&
    receiverAc.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAc.movements.push(amount);

    updateUi(currentAccount);
  }
});

/* ------------------------------ Request loan ------------------------------ */

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});
/* ----------------------------- Delete account ----------------------------- */
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

/* ---------------------------- Implementing sort --------------------------- */
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);

  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// SECTION  LECTURE

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//NOTE SLICE method return new array no effect on original array
console.log(arr.slice());
console.log([...arr]);
console.log(arr.slice(2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//NOTE Splicee method mutate the original array

console.log(arr.splice(2));
console.log(arr);

console.log(arr.splice(1, 3));

// let arr2 = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse();
const letter = arr.concat(arr2);
console.log(letter.join(' * '));

console.log(arr2.join(arr));

console.log(arr.shift());
console.log(arr.unshift('aa'));
console.log(arr.pop());

console.log(arr);

const movement = [200, 450, -400, 3000, -6000, 650, 130];

for (let [i, mov] of movement.entries()) {
  if (mov > 0) {
    console.log(`movements ${i} : you deposit ${Math.abs(mov)}`);
  } else {
    console.log(`movements ${i} : you widtdraw ${Math.abs(mov)}`);
  }
}

movement.forEach(function (mov) {
  if (mov > 0) {
    console.log(`movements: you deposit ${Math.abs(mov)}`);
  } else {
    console.log(`movements  : you widtdraw ${Math.abs(mov)}`);
  }
});

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
*/
/* -------------------------------------------------------------------------- */
/*                        TODO Coding Challenge #1                            */
/* -------------------------------------------------------------------------- */
/**
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉
 */

/*
console.log('cosing 1');
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const finalDogsJulia = dogsJulia.slice(1, -2);

console.log(finalDogsJulia);

const allDogs = finalDogsJulia.concat(dogsKate);
console.log(allDogs);

allDogs.forEach(function (age, i) {
  const type = age < 3 ? 'puppy' : 'dog';
  if (type === 'dog') {
    console.log(`Dog number ${i + 1} is an adult, and is ${age} years old"`);
  } else {
    console.log(`Dog number ${i + 1} is still a puppy`);
  }
});
/*
const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

const juliaFinalData = juliaData.slice(1, -2);

const dataTogether = [...juliaFinalData, ...kateData];

const checkDogs = function (data) {
  data.forEach((mov, i) => {
    const type = mov >= 3 ? 'dog' : 'puppy';
    if (mov >= 3) {
      console.log(`Dog number ${i + 1}
is an adult, and is ${mov} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy
🐶`);
    }
  });
};

checkDogs(dataTogether);


*/
/* -------------------------------------------------------------------------- */
/*                            TODO Coding Challenge #2                            */
/* -------------------------------------------------------------------------- */
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

*/
/*
// solution 1
const Data1 = [5, 2, 4, 1, 15, 8, 3];
const Data2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = data => {
  const dogAge = data
    .map(dt => {
      return dt <= 2 ? 2 * dt : 16 + dt * 4;
    })
    .filter(age => age > 18)
    .reduce((acc, mov, i, arr) => (acc += mov / arr.length), 0);
  // console.log(dogAge);
  return dogAge;
};

console.log(calcAverageHumanAge(Data1));
console.log(calcAverageHumanAge(Data2));
*/
/*
// solution 2
const data1 = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = function (age) {
  const humanAge = age.map(mov => {
    return mov <= 2 ? 2 * mov : 16 + mov * 4;
  });
  console.log(humanAge);
  const adult = humanAge.filter(mov => {
    return mov > 18;
  });
  console.log(adult);

  const adultAverageAge = adult.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return adultAverageAge;
};
const a = calcAverageHumanAge(data1);
const b = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(a, b);

/* -------------------------------------------------------------------------- */
/*                            TODO Coding Challenge #3                            */
/* -------------------------------------------------------------------------- */
/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

*/
/*
const calcAverageHumanAge = data => {
  const humanage = data
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  // console.log(humanage);
  return humanage;
};
const a = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(a);
*/
/*
const movement = [200, 450, -400, 3000, 6000, 650, 130];

const withdrawal = movement.filter(num => num < 0);
console.log(withdrawal);

const wid = [];

for (let num of movement) if (num < 0) wid.push(num);
console.log(wid);
const bal = movement.reduce(function (accs, num) {
  console.log(`${accs},  ${num}`);
  return accs + num;
});
console.log(bal);

const wid = [];

for (let num of movement) if (num < 0) wid.push(num);
console.log(wid);

const max = movement.reduce((acc, val) => {
  if (acc > val) return acc;
  else return val;
}, movement[0]);
console.log(max);

var itemsToBuy = {
  milk: {
    quantity: 5,
    price: 20,
  },
  bread: {
    quantity: 2,
    price: 15,
  },
  potato: {
    quantity: 3,
    price: 10,
  },
};

var keyss = Object.keys(itemsToBuy);
console.log(keyss);

var ent = Object.entries(itemsToBuy);

for (const [key, { quantity, price }] of ent) {
  console.log(price);
}
*/

const diceRoll = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(diceRoll);
