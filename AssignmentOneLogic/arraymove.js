var board = [
  [1, 8, 2],
  [0, 4, 3],
  [7, 6, 5],
];

const freshboard = [
  [1, 8, 2],
  [0, 4, 3],
  [7, 6, 5],
];

print(board[2][0]);
var won = false;

const goalboard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];
var count = 0;

var zeroindex = 0;
var zerosubindex = 0;

var lastmove = "";

//finding initial zero
for (let i = 0; i < board.length; i++) {
  for (let t = 0; t < board.length; t++) {
    if (board[i][t] === 0) {
      zeroindex = i;
      zerosubindex = t;
    }
  }
}

function moveleft() {
  lastmove = "left";
  for (let i = 0; i < board.length; i++) {
    for (let t = 0; t < board.length; t++) {
      if (board[i][t] === 0) {
        zeroindex = i;
        zerosubindex = t;
      }
    }
  }
  board[zeroindex][zerosubindex] = board[zeroindex][zerosubindex + 1];
  board[zeroindex][zerosubindex + 1] = 0;
  console.log("moved left");
  return getcorrect();
}
function moveup() {
  lastmove = "up";
  for (let i = 0; i < board.length; i++) {
    for (let t = 0; t < board.length; t++) {
      if (board[i][t] === 0) {
        zeroindex = i;
        zerosubindex = t;
      }
    }
  }

  board[zeroindex][zerosubindex] = board[zeroindex - 1][zerosubindex];

  board[zeroindex - 1][zerosubindex] = 0;
  console.log("moved up");
  return getcorrect();
}
function moveright() {
  lastmove = "right";
  for (let i = 0; i < board.length; i++) {
    for (let t = 0; t < board.length; t++) {
      if (board[i][t] === 0) {
        zeroindex = i;
        zerosubindex = t;
      }
    }
  }

  board[zeroindex][zerosubindex] = board[zeroindex][zerosubindex - 1];

  board[zeroindex][zerosubindex - 1] = 0;
  console.log("moved right");
  return getcorrect();
}
function movedown() {
  lastmove = "down";
  for (let i = 0; i < board.length; i++) {
    for (let t = 0; t < board.length; t++) {
      if (board[i][t] === 0) {
        zeroindex = i;
        zerosubindex = t;
      }
    }
  }

  board[zeroindex][zerosubindex] = board[zeroindex + 1][zerosubindex];

  board[zeroindex + 1][zerosubindex] = 0;
  console.log("moved down");
  return getcorrect();
}
function getcorrect() {
  var correct = 0;
  for (let i = 0; i < board.length; i++) {
    for (let t = 0; t < board.length; t++) {
      if (board[i][t] === goalboard[i][t]) {
        correct++;
      }
    }
  }
  return correct;
}
function printboard(aboard) {
  console.log(aboard[0]);
  console.log(aboard[1]);
  console.log(aboard[2]);
}

function AI() {
  count++;
  console.log({ count });
  if (getcorrect() === 9 || board[1].length === 4) {
    won = true;
    printboard(board);
    console.log("finished");
  }
  if (!won) {
    if (count % 53 === 0) {
      printboard(freshboard);
      board = [
        [1, 8, 2],
        [0, 4, 3],
        [7, 6, 5],
      ];
      console.log("----------------new board-------------------------");
      printboard(board);
    }

    for (let i = 0; i < board.length; i++) {
      for (let t = 0; t < board.length; t++) {
        if (board[i][t] === 0) {
          zeroindex = i;
          zerosubindex = t;
        }
      }
    }

    print("AI Iterations");
    printboard(board);
    if (zeroindex === 0 && zerosubindex === 0) {
      var numz = [];
      //test move left
      moveleft();
      numz.push(getcorrect());
      moveright();
      //test move down
      movedown();
      numz.push(getcorrect());
      moveup();
      //make a decison

      numz = randomtie(numz);

      var max = Math.max(...numz);

      if (numz[0] === max) {
        console.log("I should move down");
        movedown();
        AI();
      } else if (numz[1] === max) {
        console.log("I should move left");
        moveleft();
        AI();
      } else {
        print("got nothing");
      }
    } else if (zeroindex === 1 && zerosubindex === 0) {
      var numz = [];
      //test a move up
      moveup();
      numz.push(getcorrect());
      movedown();
      //test a move left
      moveleft();
      numz.push(getcorrect());
      moveright();
      //test a move down
      movedown();
      numz.push(getcorrect());
      moveup();
      numz = randomtie(numz);
      print({ numz });
      var max = Math.max(...numz);
      if (numz[0] === max) {
        console.log("I should move up");
        moveup();
        AI();
      } else if (numz[1] === max) {
        print("I should move left");
        moveleft();
        AI();
      } else if (numz[2] === max) {
        print("I should move down");
        movedown();
        AI();
      } else {
        print("got nothing");
        console.log({ num1 }, { num2 }, { num3 });
      }
    } else if (zeroindex === 0 && zerosubindex === 1) {
      var numz = [];
      movedown();
      numz.push(getcorrect());
      moveup();
      moveleft();
      numz.push(getcorrect());
      moveright();
      moveleft();
      numz.push(getcorrect());
      moveright();

      numz = randomtie(numz);
      console.log({ numz });
      var max = Math.max(...numz);
      console.log({ max });
      if (numz[0] === max) {
        movedown();
        AI();
      } else if (numz[1] === max) {
        moveleft();
        AI();
      } else if (numz[2] === max) {
        moveright();
        AI();
      }
    } else if (zeroindex === 0 && zerosubindex === 2) {
      var numz = [];
      //test right
      moveright();
      numz.push(getcorrect());
      moveleft();
      //test down
      movedown();
      numz.push(getcorrect());
      moveup();
      numz = randomtie(numz);
      console.log({ numz });
      var max = Math.max(...numz);
      if (max === numz[0]) {
        moveright();
        AI();
      } else if (max === numz[1]) {
        movedown();
        AI();
      }
    } else if (zeroindex === 1 && zerosubindex === 1) {
      var numz = [];
      //test a move up
      moveup();
      numz.push(getcorrect());
      movedown();
      //test a move down
      movedown();
      numz.push(getcorrect());
      moveup();
      //test a move left
      moveleft();
      numz.push(getcorrect());
      moveright();
      //test a move right
      moveright();
      numz.push(getcorrect());
      moveleft();
      numz = randomtie(numz);
      console.log({ numz });
      var max = Math.max(...numz);
      if (max === numz[0]) {
        moveup();
        AI();
      } else if (max === numz[1]) {
        movedown();
        AI();
      } else if (max === numz[2]) {
        moveleft();
        AI();
      } else if (max === numz[3]) {
        moveright();
        AI();
      }
    } else if (zeroindex === 2 && zerosubindex === 1) {
      var numz = [];
      //test a move up
      moveup();
      numz.push(getcorrect());
      movedown();
      //test a move left
      moveleft();
      numz.push(getcorrect());
      moveright();
      //test a move right
      moveright();
      numz.push(getcorrect());
      moveleft();

      numz = randomtie(numz);
      console.log("Middle");
      console.log({ numz });
      var max = Math.max(...numz);

      if (max === numz[0]) {
        moveup();
        AI();
      } else if (max === numz[1]) {
        moveleft();
        AI();
      } else if (max === numz[2]) {
        moveright();
        AI();
      }
    } else if (zeroindex === 2 && zerosubindex === 2) {
      var numz = [];
      //test a move up
      moveup();
      numz.push(getcorrect());
      movedown();

      //test a move right
      moveright();
      numz.push(getcorrect());
      moveleft();
      console.log("Corner");

      numz = randomtie(numz);
      console.log({ numz });
      var max = Math.max(...numz);

      if (max === numz[0]) {
        moveup();
        AI();
      } else if (max === numz[1]) {
        moveright();
        AI();
      }
    } else if (zeroindex === 1 && zerosubindex === 2) {
      var numz = [];
      //test a move up
      moveup();
      numz.push(getcorrect());
      movedown();
      //test a move right
      moveright();
      numz.push(getcorrect());
      moveleft();
      //test a move down
      movedown();
      numz.push(getcorrect());
      moveup();
      console.log({ numz });
      numz = randomtie(numz);
      var max = Math.max(...numz);

      if (max === numz[0]) {
        moveup();
        AI();
      } else if (max === numz[1]) {
        moveright();
        AI();
      } else if (max === numz[2]) {
        movedown();
        AI();
      }
    } else if (zeroindex === 2 && zerosubindex === 0) {
      var numz = [];
      //test a move up
      moveup();
      numz.push(getcorrect());
      movedown();
      //test a move right
      moveright();
      numz.push(getcorrect());
      moveleft();

      console.log({ numz });
      numz = randomtie(numz);
      var max = Math.max(...numz);

      if (max === numz[0]) {
        moveup();
        AI();
      } else if (max === numz[1]) {
        moveright();
        AI();
      }
    }
  }
}

AI();
printboard(freshboard);

function print(statement) {
  console.log(statement);
}

function randomtie(numbers) {
  console.log({ numbers });
  var maxi = Math.max(...numbers);
  var newnumbers = [];

  if (numbers.length === 2 && Math.max(...numbers) - Math.min(...numbers) < 3) {
    console.log("hello");
    newnumbers = numbers.map((x) => Math.floor(Math.random() * 1000));
    return newnumbers;
  } else {
    console.log("hi");
    newnumbers = numbers.map((x) =>
      x === maxi ? x + Math.floor(Math.random() * 1000) : x
    );
    console.log({ newnumbers });
    return newnumbers;
  }
}
