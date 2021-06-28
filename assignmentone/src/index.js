import react from "react";
import { useState, useEffect } from "react";
import reactdom from "react-dom";
import {
  ChakraProvider,
  Center,
  Heading,
  Text,
  Link,
  Button,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";

const numbercorrect = function (x) {
  return 5;
};

var tree = [];
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

  function movedown(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex + 1, 1, value);
    if (index === 0) {
      var newboard = [temp, boardstate[1], boardstate[2]];
      setboardstate(newboard);
      return getH(newboard);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      setboardstate(newboard);
      return getH(newboard);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      setboardstate(newboard);
      return getH(newboard);
    }
  }
  function moveup(index, sindex, zeroindex, zerosindex, value) {
    var temp = [...boardstate[index]];
    temp.splice(sindex, 1, 0);
    temp.splice(sindex - 1, 1, value);
    if (index === 0) {
      setboardstate([temp, boardstate[1], boardstate[2]]);
      setboardstate([temp, boardstate[1], boardstate[2]]);
      return getH(newboard);
    }
    if (index === 1) {
      var newboard = [boardstate[0], temp, boardstate[2]];
      setboardstate([boardstate[0], temp, boardstate[2]]);
      return getH(newboard);
    }
    if (index === 2) {
      var newboard = [boardstate[0], boardstate[1], temp];
      setboardstate([boardstate[0], boardstate[1], temp]);
      return getH(newboard);
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
      return getH(newboard);
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
      return [temp0, temp1, temp2];
    }
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

  const [top, settop] = useState(false);
  const [right, setright] = useState(false);
  const [left, setleft] = useState(false);
  const [bottom, setbottom] = useState(false);
  const [goal, setgoal] = useState(false);
  const [zerodir, setzerodir] = useState("nowhere");
  const [boardstate, setboardstate] = useState(board);
  const [aiboardstate, setaiboardstate] = useState(aiboard);
  const [inputindex, setinputindex] = useState(0);
  const [inputsubindex, setinputsubindex] = useState(0);
  const [corrects, setcorrects] = useState([]);
  const [g, setg] = useState(0);
  const [h, seth] = useState([]);
  const [pressed, setpressed] = useState(false);

  function AI(index, sindex, zeroindex, zerosindex, value) {
    var zeroindex = 0;
    var zerosubindex = 0;

    for (let i = 0; i < boardstate.length; i++) {
      for (let t = 0; t < boardstate.length; t++) {
        if (boardstate[i][t] === 0) {
          zeroindex = i;
          zerosubindex = t;
        }
      }
    }
    console.log("Zero was at:" + zeroindex + ", " + zerosubindex);
    if (zeroindex === 0 && zerosubindex === 0) {
      console.log("I am top left");
      console.log("I could've move in two directions");
      var num = movedown(index, sindex, zeroindex, zerosindex, value);
      console.log({ num });
    }
    if (zeroindex === 0 && zerosubindex === 1) {
      console.log("I am middle left");
      console.log("I could've move in three directions");
    }
    if (zeroindex === 0 && zerosubindex === 2) {
      console.log("I am bottom left");
      console.log("I could've move in two directions");
    }
    if (zeroindex === 1 && zerosubindex === 0) {
      console.log("I am top middle");
      console.log("I could've move in three directions");
    }
    if (zeroindex === 1 && zerosubindex === 1) {
      console.log("I am middle middle");
      console.log("I could've move in four directions");
    }
    if (zeroindex === 1 && zerosubindex === 2) {
      console.log("I am bottom middle");
      console.log("I could've move in three directions");
    }
    if (zeroindex === 2 && zerosubindex === 0) {
      console.log("I am top right");
      console.log("I could've move in two directions");
    }
    if (zeroindex === 2 && zerosubindex === 1) {
      console.log("I am middle right");
      console.log("I could've've move in three directions");
    }
    if (zeroindex === 2 && zerosubindex === 2) {
      console.log("I am bottom right");
      console.log("I could've move in two directions");
    }
  }

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
    console.log({ tree });
    setcorrects(h.flat());
  }, [pressed]);
  function handleClick(index, sindex) {
    AI(index, sindex, zeroindex, zerosindex, value);
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

    {
      /* console.log("Button Pressed:" + index + ", " + sindex);
    console.log("Board Index 0: " + boardstate[0]);
    console.log("Board Index 1: " + boardstate[1]);
    console.log("Board Index 2: " + boardstate[2]);
    console.log("Zero Index was : " + zeroindex + " " + zerosindex); */
    }

    if (sindex < board.length - 1) {
      if (boardstate[index][sindex + 1] === boardstate[zeroindex][zerosindex]) {
        movedown(index, sindex, zeroindex, zerosindex, value);
      }
    }
    if (sindex > 0) {
      if (boardstate[index][sindex - 1] === boardstate[zeroindex][zerosindex]) {
        moveup(index, sindex, zeroindex, zerosindex, value);
      }
    }
    if (index < board.length - 1) {
      if (boardstate[index + 1][sindex] === boardstate[zeroindex][zerosindex]) {
        moveright(index, sindex, zeroindex, zerosindex, value);
      }
    }
    if (index > 0) {
      if (board[index - 1][sindex] === board[zeroindex][zerosindex]) {
        console.log("swap left zero ");
        moveleft(index, sindex, zeroindex, zerosindex, value);
      }
    }
  }

  return (
    <Center p="20">
      <Text>H is {corrects.length}</Text>
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
    </Center>
  );
}

reactdom.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
