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

  const cart = [
    (5)[("Corn", "Potato", "Radish")],
    (6)[("Tomato", "Graphes", "Mango")],
    7,
  ];

  return (
    <Center p="20">
      <HStack>
        {board.map((items, index) => {
          return (
            <VStack>
              {items.map((sitem, sindex) => {
                return <Button>{sitem}</Button>;
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
