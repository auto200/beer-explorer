import { HStack, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  label: string;
  value: string;
}

const LabelValuePair = ({ label, value }: Props) => {
  return (
    <HStack>
      <Text>{label}</Text>
      <Text fontSize="2xl" fontWeight="bold" ml={1}>
        {value}
      </Text>
    </HStack>
  );
};

export default LabelValuePair;
