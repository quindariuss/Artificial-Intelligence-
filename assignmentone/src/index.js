import react from "react";
import reactdom from "react-dom";
import { ChakraProvider, Heading, Text, Link } from "@chakra-ui/react";

reactdom.render(
  <ChakraProvider>
    <Heading>Hello World</Heading>
  </ChakraProvider>,
  document.getElementById("root")
);
