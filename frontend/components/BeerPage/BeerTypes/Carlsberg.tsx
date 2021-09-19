import React from "react";
import {
  Text,
  Heading,
  VStack,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";
import { CarlsbergBeer } from "@shared/types";

interface Props {
  beer: CarlsbergBeer;
}

const Carlsberg: React.FC<Props> = ({ beer }) => {
  return (
    <VStack mt="25px !important" w="full">
      {beer.alcoholByVolume !== "0%" && (
        <HStack>
          <Text>Zawartość alkoholu: </Text>
          <Heading fontSize="2xl">{beer.alcoholByVolume}</Heading>
        </HStack>
      )}
      {beer.type && (
        <HStack>
          <Text>Typ: </Text>
          <Heading fontSize="2xl">{beer.type}</Heading>
        </HStack>
      )}
      {
        <Accordion allowToggle={true} w="full">
          <AccordionItem>
            <Heading>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="medium">
                  Opis
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel>{beer.description}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      }
      {beer.ingredients && (
        <VStack>
          <Text>Składniki: </Text>
          <Heading fontSize="xl" textAlign="center" marginTop="0 !important">
            {beer.ingredients.replace("Składniki: ", "")}
          </Heading>
        </VStack>
      )}
      {beer.nutritionalValues && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th colSpan={2} textAlign="center" fontSize="lg">
                wartości odżywcze/100ml
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Wartość energetyczna</Td>
              <Th>{beer.nutritionalValues.kj}</Th>
            </Tr>
            <Tr>
              <Td>Wartość energetyczna</Td>
              <Th>{beer.nutritionalValues.kcal}</Th>
            </Tr>
            <Tr>
              <Td>Tłuszcze</Td>
              <Th>{beer.nutritionalValues.fat}</Th>
            </Tr>
            <Tr>
              <Td>W tym kwasy tłuszczowe nasycone</Td>
              <Th>{beer.nutritionalValues.saturatedFat}</Th>
            </Tr>
            <Tr>
              <Td>Węglowodany</Td>
              <Th>{beer.nutritionalValues.carbs}</Th>
            </Tr>
            <Tr>
              <Td>W tym cukry</Td>
              <Th>{beer.nutritionalValues.sugars}</Th>
            </Tr>
            <Tr>
              <Td>Białko</Td>
              <Th>{beer.nutritionalValues.protein}</Th>
            </Tr>
            <Tr>
              <Td>Sól</Td>
              <Th>{beer.nutritionalValues.salt}</Th>
            </Tr>
          </Tbody>
        </Table>
      )}
      {beer.origin && (
        <HStack>
          <Text>Pochodzenie: </Text>
          <Heading fontSize="2xl">{beer.origin}</Heading>
        </HStack>
      )}
    </VStack>
  );
};

export default Carlsberg;
