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

    for (let i = 0; i < board.length; i++) {
      for (let t = 0; t < board.length; t++) {
        if (board[i][t] === 0) {
          zeroindex = i;
          zerosindex = t;
        }
      }
    }
    if (zeroindex === index + 1 && zerosindex === sindex) {
      console.log("swap");
      var value = board[index][sindex];
      var temp = [...board];
      var temprowzero = board[index].splice(sindex, 1, 0);
      var temprow = board[zeroindex].splice(zerosindex, 1, value);
      console.log("Index: " + index);
      console.log("Subindex: " + sindex);
      console.log(board[index][sindex]);
      console.log(temp);
      var temp0 = board.splice(sindex, 1, [temprowzero]).flat();
      var temp1 = [...board[1]];
      var temp2 = [...board[2]];
      var temp2 = board.splice(zeroindex, 1, [temprow]).flat();
      console.log(temp);
      console.log(temp0);
      console.log(temp1);
      console.log(temp2);
      setboardstate([temp0, temp1, temp2]);
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
