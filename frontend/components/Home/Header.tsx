import { Flex, Input, Select } from "@chakra-ui/react";
import { OWNERS_DATA } from "@shared/constants";
import { BrandFilterId } from "@utils/types";
import { useDebounce } from "frontend/utils/hooks";
import React, { useEffect, useState } from "react";

interface Props {
  filterBrandId: BrandFilterId;
  setFilterBrandId: React.Dispatch<React.SetStateAction<BrandFilterId>>;
  setFilterBeerName: React.Dispatch<React.SetStateAction<string>>;
}

const DEBOUNCE_DELAY = 300;

const Header: React.FC<Props> = ({
  filterBrandId,
  setFilterBrandId,
  setFilterBeerName,
}) => {
  const [localFilterBeerName, setLocalFilterBeerName] = useState("");
  const debouncedLocalFilterBeerName = useDebounce(
    localFilterBeerName,
    DEBOUNCE_DELAY
  );

  useEffect(() => {
    setFilterBeerName(debouncedLocalFilterBeerName);
  }, [debouncedLocalFilterBeerName, setFilterBeerName]);

  return (
    <Flex>
      <Select
        value={filterBrandId}
        onChange={(e) => setFilterBrandId(e.target.value as BrandFilterId)}
      >
        <option value="ALL">Wszystkie</option>
        {Object.entries(OWNERS_DATA).map(([id, { name }]) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Select>
      <Input
        value={localFilterBeerName}
        onChange={(e) => setLocalFilterBeerName(e.target.value)}
        placeholder="Szukaj po nazwie piwa"
      />
    </Flex>
  );
};

export default Header;
