import { Flex, Heading, Img, VStack } from "@chakra-ui/react";
import React from "react";

const BeerNotFound: React.FC = () => {
  return (
    <Flex
      minH="calc(100vh - 100px)"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack>
        <Img
          src="/beer-not-found.png"
          width={100}
          height={250}
          alt="nie znaleziono"
        />
        <Heading>Brak wyników</Heading>
      </VStack>
    </Flex>
  );
};

export default BeerNotFound;
