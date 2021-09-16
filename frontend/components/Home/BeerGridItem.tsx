import {
  Box,
  Heading,
  VStack,
  Img,
  Text,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { AnyBeer } from "../../beerTypes";

interface Props {
  beer: AnyBeer;
}

const BeerGridItem: React.FC<Props> = ({ beer }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const MARGIN = 3;
    if (!titleRef.current) return;
    //for some reason all elements even not visibly overflowing have some margin
    if (titleRef.current.scrollHeight - titleRef.current.clientHeight > MARGIN)
      setIsTooltipVisible(true);
  }, [titleRef.current]);

  return (
    //TODO: pass proper href to the product page
    <Link href="#">
      <VStack>
        <Tooltip
          label={beer.name}
          placement="top"
          textAlign="center"
          visibility={isTooltipVisible ? undefined : "hidden"}
        >
          <Box h="120px" textAlign="center">
            <Heading noOfLines={2} alt={beer.name} ref={titleRef}>
              {beer.name}
            </Heading>
          </Box>
        </Tooltip>
        <Box>
          <Img src={beer.img} alt={beer.name} h="150px" />
        </Box>
        <Text alt="Producent">
          <Button>Dowiedz się więcej</Button>
        </Text>
      </VStack>
    </Link>
  );
};

export default BeerGridItem;
