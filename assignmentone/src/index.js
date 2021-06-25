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
    [3, 0, 4],
    [5, 2, 1],
  ];
  const [top, settop] = useState(false);
  const [right, setright] = useState(false);
  const [left, setleft] = useState(false);
  const [bottom, setbottom] = useState(false);
  const [nearzero, setnearzero] = useState(false);

  const [boardstate, setboardstate] = useState(board);

  function handleClick(index, sindex) {
    var zeroindex = 0;
    var zerosindex = 0;
    var value = boardstate[index][sindex];
    console.log("Index: " + index + "\nSub Index: " + sindex);

    if (index === 0) {
      setleft(true);
      console.log("I am left");
      if (boardstate[index + 1][sindex] === 0) {
        console.log("I am left to a zero");
        setnearzero(true);
      }
      if (sindex === 0) {
        settop(true);
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
        }
        console.log("I am top");
      } else if (sindex === 2) {
        bottom = true;
        console.log("I am bottom");
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
        }
      } else {
        console.log("I am vertially middle");
      }
    } else if (index === 2) {
      setright(true);
      console.log("I am right");
      if (boardstate[index - 1][sindex] === 0) {
        console.log("I am right to a zero");
        setnearzero(true);
      }
      if (sindex === 0) {
        settop(true);
        console.log("I am top");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
        }
      } else if (sindex === 2) {
        setbottom(true);
        console.log("I am bottom");
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
        }
      } else {
        console.log("I am vertially middle");
      }
    } else {
      console.log("I am horizontally middle");
      if (sindex === 0) {
        settop(true);
        console.log("I am top");
        if (boardstate[index][sindex + 1] === 0) {
          console.log("I have a zero below me");
          setnearzero(true);
        }
      } else if (sindex === 2) {
        setbottom(true);
        console.log("I am bottom");
        if (boardstate[index][sindex - 1] === 0) {
          console.log("I have a zero above me");
          setnearzero(true);
        }
      } else {
        console.log("I am vertially middle");
      }
    }

    {
      /* for (let i = 0; i < boardstate.length; i++) {
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
    if (sindex > 0) {
      console.log("inside bottom");
      if (boardstate[index][sindex - 1] === boardstate[zeroindex][zerosindex]) {
        if (sindex === 2) {
          console.log("hello rock bottom");
        }
        if (sindex === 1) {
          console.log("hello middle bottom");
        }
      }
    }
    if (sindex < boardstate[index].length - 1) {
      console.log("inside top");
      if (boardstate[index][sindex + 1] === boardstate[zeroindex][zerosindex]) {
        if (sindex === 0) {
          var zero = 0;
          var temp = boardstate.splice(1, 1, [0, 3, 4]);
          console.log(temp);
          console.log("hello tippy top");
        }
        if (sindex === 1) {
          console.log("hello middle top");
        }
      }
    } */
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
