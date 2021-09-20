import { Box, Flex } from "@chakra-ui/react";
import ExternalLink from "@components/shared/ExternalLink";
import { OWNERS_DATA } from "@shared/constants";
import React from "react";

const Footer = () => {
  const sources = Object.values(OWNERS_DATA);

  return (
    <Flex
      as="footer"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
      p="5px"
    >
      {sources.map(({ name, website }, i) => (
        <>
          <ExternalLink href={website}>{name}</ExternalLink>
          {i !== sources.length - 1 && <Box mx="5px">|</Box>}
        </>
      ))}
    </Flex>
  );
};

export default Footer;
