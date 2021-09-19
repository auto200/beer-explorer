import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box, Heading } from "@chakra-ui/layout";
import React from "react";

interface Props {
  label?: string;
}

const Description: React.FC<Props> = ({ label = "Opis", children }) => {
  return (
    <Accordion allowToggle={true} w="full">
      <AccordionItem>
        <Heading>
          <AccordionButton _focus={{ boxShadow: "" }}>
            <Box flex="1" textAlign="left" fontWeight="medium">
              {label}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Description;
