import { VStack } from "@chakra-ui/react";
import React from "react";

const SpecificBeerInfoWrapper: React.FC = ({ children }) => {
  return (
    <VStack mt="25px !important" w="full">
      {children}
    </VStack>
  );
};

export default SpecificBeerInfoWrapper;
