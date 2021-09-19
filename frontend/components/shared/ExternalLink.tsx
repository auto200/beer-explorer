import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, Text, LinkProps } from "@chakra-ui/react";
import React from "react";

const ExternalLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link isExternal {...props}>
      <Text display="flex" alignItems="center">
        {children}
        <ExternalLinkIcon ml="5px" />
      </Text>
    </Link>
  );
};

export default ExternalLink;
