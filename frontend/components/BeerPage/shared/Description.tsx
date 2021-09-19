import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Heading, Box } from "@chakra-ui/layout";
import React from "react";

interface Props {
  label?: string;
}

const Description: React.FC<Props> = ({ label = "Opis", children }) => {
  return (
    <Accordion allowToggle={true} w="full">
      <AccordionItem>
        <Heading>
          <AccordionButton>
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
