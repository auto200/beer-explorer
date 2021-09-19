import { Box, Heading, VStack, Img, Button, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnyBeer } from "@shared/types";
import { isCarlsbergBeer, limitCarlsbergBeerImgSrcHeight } from "@utils";

const IMAGE_HEIGHT = 150;

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

  const imgSrc = isCarlsbergBeer(beer)
    ? limitCarlsbergBeerImgSrcHeight(beer.img, IMAGE_HEIGHT)
    : beer.img;

  return (
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
        <Img src={imgSrc} alt={beer.name} h={IMAGE_HEIGHT} />
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
