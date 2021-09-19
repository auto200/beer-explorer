import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import { NutritionalValues } from "@shared/types";
import React from "react";

interface Props {
  values: NutritionalValues;
}

const NutritionalValuesTable: React.FC<Props> = ({ values }) => {
  return (
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
          <Th>{values.kj}</Th>
        </Tr>
        <Tr>
          <Td>Wartość energetyczna</Td>
          <Th>{values.kcal}</Th>
        </Tr>
        <Tr>
          <Td>Tłuszcze</Td>
          <Th>{values.fat}</Th>
        </Tr>
        <Tr>
          <Td>W tym kwasy tłuszczowe nasycone</Td>
          <Th>{values.saturatedFat}</Th>
        </Tr>
        <Tr>
          <Td>Węglowodany</Td>
          <Th>{values.carbs}</Th>
        </Tr>
        <Tr>
          <Td>W tym cukry</Td>
          <Th>{values.sugars}</Th>
        </Tr>
        <Tr>
          <Td>Białko</Td>
          <Th>{values.protein}</Th>
        </Tr>
        <Tr>
          <Td>Sól</Td>
          <Th>{values.salt}</Th>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default NutritionalValuesTable;
