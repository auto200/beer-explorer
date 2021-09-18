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

import { AnyBeer } from "@shared/types";

interface Props {
  beer: AnyBeer;
}

const BeerGridItem: React.FC<Props> = ({ beer }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const MARGIN = 3;
    const { scrollHeight, clientHeight } = titleRef.current;
    //for some reason all elements even not visibly overflowing have some margin
    if (scrollHeight - clientHeight > MARGIN) setIsTooltipVisible(true);
  }, []);

  return (
    //TODO: pass proper href to the product page
    <VStack as="a">
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
      <Link href={`/${beer.slug}`}>
        <a>
          <Button>Dowiedz się więcej</Button>
        </a>
      </Link>
    </VStack>
  );
};

export default BeerGridItem;
