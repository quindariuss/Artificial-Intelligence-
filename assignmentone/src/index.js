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

function App() {
  const board = [
    [1, 7, 8],
    [3, 0, 4],
    [6, 2, 5],
  ];
  const [top, settop] = useState(false);
  const [right, setright] = useState(false);
  const [left, setleft] = useState(false);
  const [bottom, setbottom] = useState(false);
  const [nearzero, setnearzero] = useState(false);
  const [zerodir, setzerodir] = useState("nowhere");
  const [boardstate, setboardstate] = useState(board);
  const [inputindex, setinputindex] = useState(0);
  const [inputsubindex, setinputsubindex] = useState(0);

  useEffect(() => {
    {
    }
  });
  function handleClick(index, sindex) {
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

    console.log("Button Pressed:" + index + ", " + sindex);
    console.log("Board Index 0: " + boardstate[0]);
    console.log("Board Index 1: " + boardstate[1]);
    console.log("Board Index 2: " + boardstate[2]);
    console.log("Zero Index was : " + zeroindex + " " + zerosindex);

    if (sindex < board.length - 1) {
      if (boardstate[index][sindex + 1] === boardstate[zeroindex][zerosindex]) {
        console.log("holla");
        if (sindex === 0) {
          var temp = [...boardstate[index]];
          temp.splice(sindex, 1, 0);
          temp.splice(sindex + 1, 1, value);
          if (index === 0) {
            setboardstate([temp, boardstate[1], boardstate[2]]);
          }
          if (index === 1) {
            setboardstate([boardstate[0], temp, boardstate[2]]);
          }
          if (index === 2) {
            setboardstate([boardstate[0], boardstate[1], temp]);
          }
        }
      }
    }
    if (sindex > 0) {
      if (boardstate[index][sindex - 1] === boardstate[zeroindex][zerosindex]) {
        console.log("holla back");
      }
    }

    if (index < board.length - 1) {
      if (boardstate[index + 1][sindex] === boardstate[zeroindex][zerosindex]) {
        console.log("swap right zero");
        console.log(value);
        if (index === 1) {
          var temprowzero = boardstate[index].splice(sindex, 1, 0);
          var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
          var temp1 = boardstate.splice(index, 1, [temprowzero]).flat();
          var temp0 = [...boardstate[0]];
          var temp2 = boardstate.splice(zeroindex, 1, [temprow]).flat();
          setboardstate([temp0, temp1, temp2]);
        } else if (index === 0) {
          var temprowzero = boardstate[index].splice(sindex, 1, 0);
          var temp0 = boardstate.splice(index, 1, [temprowzero]).flat();
          var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
          var temp2 = [...boardstate[2]];
          console.log("Temp 1:" + temp1);
          var temp1 = boardstate.splice(zeroindex, 1, [temprow]).flat();
          console.log("Temp 0:" + temp0);
          console.log("Temp 1:" + temp1);
          console.log("Temp 2:" + temp2);
          setboardstate([temp0, temp1, temp2]);
        }
      }
    }
    if (index > 0) {
      if (board[index - 1][sindex] === board[zeroindex][zerosindex]) {
        console.log("swap left zero ");
        if (index === 2) {
          var temprowzero = boardstate[index].splice(sindex, 1, 0);
          var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
          var temp1 = [...boardstate[1]];
          var temp0 = [...boardstate[0]];
          var temp2 = boardstate.splice(index, 1, [temprow]).flat();
          console.log("Temp 0:" + temp0);
          console.log("Temp 1:" + temp1);
          console.log("Temp 2:" + temp2);
          setboardstate([temp0, temp1, temp2]);
        } else if (index === 1) {
          var temprowzero = boardstate[index].splice(sindex, 1, 0);
          var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
          var temp2 = [...boardstate[2]];
          var temp0 = boardstate.splice(zeroindex, 1, [temprowzero]).flat();
          var temp1 = boardstate.splice(index, 1, [temprow]).flat();
          console.log("Temp 0:" + temp0);
          console.log("Temp 1:" + temp1);
          console.log("Temp 2:" + temp2);
          setboardstate([temp0, temp1, temp2]);
        }
      }
    }
  }

  return (
    <Center p="20">
      <Badge colorScheme={nearzero ? "green" : "red"}>Zero {zerodir}</Badge>
      <HStack>
        {boardstate.map((items, index) => {
          return (
            <VStack>
              {items.map((sitem, sindex) => {
                return (
                  <Button onClick={() => handleClick(index, sindex)}>
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
