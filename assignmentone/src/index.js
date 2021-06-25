import react from "react";
import { useState } from "react";
import reactdom from "react-dom";
import {
  ChakraProvider,
  Center,
  Heading,
  Text,
  Link,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";

function App() {
  const board = [
    [8, 7, 6],
    [3, 4, 5],
    [0, 2, 1],
  ];

  const [boardstate, setboardstate] = useState(board);

  function handleClick(index, sindex) {
    console.log("Button Pressed:" + index + ", " + sindex);

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

    console.log("Board Index: " + boardstate[0]);
    console.log("Board Index: " + boardstate[1]);
    console.log("Board Index: " + boardstate[2]);

    console.log("Zero Index was : " + zeroindex + " " + zerosindex);
    console.log("Index length: " + index);
    console.log("Total length: " + board[index]);
    if (index < board.length - 1) {
      if (boardstate[index + 1][sindex] === boardstate[zeroindex][zerosindex]) {
        console.log("swap right zero");
        console.log(value);
        if (index === 1) {
          var temprowzero = boardstate[index].splice(sindex, 1, 0);
          var temp0 = boardstate.splice(sindex, 1, [temprowzero]).flat();
          console.log("Temp 0:" + temp0);
          var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
          var temp1 = [...boardstate[1]];
          var temp2 = boardstate.splice(zeroindex, 1, [temprow]).flat();
          setboardstate([temp0, temp1, temp2]);
        } else if (index === 0) {
          var temprowzero = boardstate[index].splice(sindex, 1, 0);
          var temp0 = boardstate.splice(sindex, 1, [temprowzero]).flat();
          console.log("Temp 1:" + temp1);
          console.log("Temp 2:" + temp2);
          console.log("Temp 0:" + temp0);
          var temprow = boardstate[zeroindex].splice(zerosindex, 1, value);
          var temp2 = [...boardstate[2]];
          console.log("Temp 1:" + temp1);
          var temp1 = boardstate.splice(zeroindex, 1, [temprow]).flat();
          console.log("Temp 2:" + temp2);
          setboardstate([temp0, temp1, temp2]);
        }
      }
    }
    if (index > 0) {
      console.log("Value: " + value);
      console.log(index);
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
