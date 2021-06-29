import react from "react";
import { useState, useEffect } from "react";
import reactdom from "react-dom";
import {
  ChakraProvider,
  Center,
  Heading,
  Text,
  Link,
  Box,
  Button,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";

function App() {
  function getH(boardarray) {
    var inplace = 0;
    for (let i = 0; i < boardarray.length; i++) {
      for (let t = 0; t < boardarray.length; t++) {
        if (boardarray[i][t] === goalstate[i][t]) {
          inplace++;
        }
      }
    }
    return inplace;
  }

  const board = [
    [1, 7, 8],
    [3, 0, 4],
    [6, 2, 5],
  ];
  const aiboard = [
    [1, 7, 8],
    [3, 0, 4],
    [6, 2, 5],
  ];
  const goalstate = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const [goal, setgoal] = useState(false);

  const [boardstate, setboardstate] = useState(board);
  const [aiboardstate, setaiboardstate] = useState(aiboard);
  const [inputindex, setinputindex] = useState(0);
  const [inputsubindex, setinputsubindex] = useState(0);
  const [corrects, setcorrects] = useState([]);
  const [g, setg] = useState(0);
  const [h, seth] = useState([]);
  const [pressed, setpressed] = useState(false);

  useEffect(() => {
    if (boardstate === goalstate) {
      setgoal(true);
    }
    for (let i = 0; i < boardstate.length; i++) {
      for (let t = 0; t < boardstate.length; t++) {
        if (boardstate[i][t] === goalstate[i][t]) {
          seth(h.splice(h.length, 0, boardstate[i][t]));
        } else {
        }
      }
    }

    setcorrects(h.flat());
  }, [pressed]);
  function handleClick(index, sindex) {
    console.log({ index }, { sindex });
    setpressed(!pressed);
    var zeroindex = 0;
    var zerosindex = 0;
    var value = boardstate[index][sindex];

    for (let i = 0; i < boardstate.length; i++) {
      for (let t = 0; t < boardstate.length; t++) {
        if (boardstate[i][t] === 0) {
          zeroindex = i;
          zerosindex = t;
        }
      }
    }

    if (sindex < board.length - 1) {
      if (boardstate[index][sindex + 1] === boardstate[zeroindex][zerosindex]) {
        console.log("move down");
        movedown(index, sindex, zeroindex, zerosindex, value);
      }
    }
    if (sindex > 0) {
      if (boardstate[index][sindex - 1] === boardstate[zeroindex][zerosindex]) {
        console.log("move up");
        moveup(index, sindex, zeroindex, zerosindex, value);
      }
    }
    if (index < board.length - 1) {
      if (boardstate[index + 1][sindex] === boardstate[zeroindex][zerosindex]) {
        console.log("move right");
        moveright(index, sindex, zeroindex, zerosindex, value);
      }
    }
    if (index > 0) {
      if (board[index - 1][sindex] === board[zeroindex][zerosindex]) {
        console.log("move left");
        moveleft(index, sindex, zeroindex, zerosindex, value);
      }
    }
  }

  //Real move functions
  function movedown(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex + 1, 1, value);
    if (index === 0) {
      var newboard = [temp, boardstate[1], boardstate[2]];
      setboardstate(newboard);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      setboardstate(newboard);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      setboardstate(newboard);
    }
  }
  function moveup(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex - 1, 1, value);
    if (index === 0) {
      setboardstate([temp, boardstate[1], boardstate[2]]);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      setboardstate([boardstate[0], temp, boardstate[2]]);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      setboardstate([boardstate[0], boardstate[1], temp]);
    }
  }
  function moveright(index, sindex, zeroindex, zerosindex, value) {
    if (index === 1) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp1 = boardstate.splice(index, 1, [temprowzero]).flat();
      var temp0 = [...boardstate[0]];
      var temp2 = boardstate.splice(zeroindex, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
    } else if (index === 0) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temp0 = boardstate.splice(index, 1, [temprowzero]).flat();
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp2 = [...boardstate[2]];
      var temp1 = boardstate.splice(zeroindex, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
    }
  }
  function moveleft(index, sindex, zeroindex, zerosindex, value) {
    if (index === 2) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp1 = [...boardstate[1]];
      var temp0 = [...boardstate[0]];
      var temp2 = boardstate.splice(index, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
      return [temp0, temp1, temp2];
    } else if (index === 1) {
      var temprowzero = boardstate[index].splice(sindex, 1, 0);
      var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
      var temp2 = [...boardstate[2]];
      var temp0 = boardstate.splice(zeroindex, 1, [temprowzero]).flat();
      var temp1 = boardstate.splice(index, 1, [temprow]).flat();
      var newboard = [temp0, temp1, temp2];
      setboardstate([temp0, temp1, temp2]);
    }
  }

  return (
    <>
      <Heading margin="5" textAlign="center">
        8 Puzzle Game
      </Heading>
      <Center>
        <Button onClick={() => solve(boardstate)} textAlign="center">
          {" "}
          Solve using A* Algorithm
        </Button>
      </Center>
      <Center p="20">
        <Box bg="blackAlpha.200" padding="10" borderRadius="10">
          <HStack>
            {boardstate.map((items, index) => {
              return (
                <VStack>
                  {items.map((sitem, sindex) => {
                    return (
                      <Button
                        size="lg"
                        colorScheme={corrects.includes(sitem) ? "red" : "blue"}
                        opacity={sitem === 0 ? "0" : "1"}
                        onClick={() => {
                          handleClick(index, sindex);
                        }}
                      >
                        {sitem}
                      </Button>
                    );
                  })}
                </VStack>
              );
            })}
          </HStack>
        </Box>
      </Center>
    </>
  );
}

reactdom.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);

function solve(board) {
  var freshboard = [...board];
  var won = false;
  const goalboard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  var count = 0;
  var zeroindex = 0;
  var zerosubindex = 0;
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
    console.log(getcorrect(board));
    if (getcorrect() === 9) {
      won = true;
      printboard(board);
      console.log("finished");
    } else if (count >= 100) {
      won = true;
      console.log("Try again");
    } else if (!won) {
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
  print("------------start------------");
  AI();
  printboard(freshboard);

  function print(statement) {
    console.log(statement);
  }

  function randomtie(numbers) {
    console.log({ numbers });
    var maxi = Math.max(...numbers);
    var newnumbers = [];

    if (
      numbers.length === 2 &&
      Math.max(...numbers) - Math.min(...numbers) < 3
    ) {
      newnumbers = numbers.map((x) => Math.floor(Math.random() * 1000));
      return newnumbers;
    } else {
      newnumbers = numbers.map((x) =>
        x === maxi ? x + Math.floor(Math.random() * 1000) : x
      );
      console.log({ newnumbers });
      return newnumbers;
    }
  }
}
