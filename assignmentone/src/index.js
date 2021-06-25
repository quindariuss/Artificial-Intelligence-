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

    for (let i = 0; i < boardstate.length; i++) {
      for (let t = 0; t < boardstate.length; t++) {
        if (boardstate[i][t] === 0) {
          zeroindex = i;
          zerosindex = t;
        }
      }
    }

    console.log("Board Index: " + boardstate[0]);
    console.log("Board Index: " + board[1]);
    console.log("Board Index: " + board[2]);

    console.log("Zero Index was : " + zeroindex + " " + zerosindex);
    console.log("Index length: " + index);
    console.log("Total length: " + board[index]);
    if (index < board.length - 1) {
      if (board[index + 1][sindex] === board[zeroindex][zerosindex]) {
        console.log("swap left");
        var value = board[index][sindex];
        var temp = [...board];
        var temprowzero = board[index].splice(sindex, 1, 0);
        var temprow = board[zeroindex].splice(zerosindex, 1, value);
        var temp0 = board.splice(sindex, 1, [temprowzero]).flat();
        var temp1 = [...board[1]];
        var temp2 = [...board[2]];
        var temp2 = board.splice(zeroindex, 1, [temprow]).flat();
        setboardstate([temp0, temp1, temp2]);
      }
    }
    if (index > 0) {
      if (board[index - 1][sindex] === board[zeroindex][zerosindex]) {
        console.log("swap right");
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
