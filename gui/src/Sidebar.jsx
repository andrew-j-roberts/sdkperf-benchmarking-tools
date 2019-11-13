/**
 * Sidebar.jsx
 */

import React from "react";
import { Link as ReachLink } from "@reach/router";
import { Flex, Link, Stack, useTheme, PseudoBox } from "@chakra-ui/core";
import { SvgSolaceSEToolkitLogo } from "../public/svg-jsx";
import theme from "./theme";
import { icons } from "./routes";

function Sidebar() {
  const theme = useTheme();
  return (
    <nav>
      <Stack
        alignItems="center"
        h="100%"
        w="100px"
        bg={theme.colors["brand"]["solaceDark"]}
        spacing={4}
      >
        <BrandLogo />
        <Stack spacing={1} w={"100%"} py="10px">
          <Link as={SidebarLink} to="/" />
          <Link as={SidebarLink} to="/jobs" />
          <Link as={SidebarLink} to="/benchmarks" />
        </Stack>
      </Stack>
    </nav>
  );
}

function BrandLogo(props) {
  return (
    <Link as={ReachLink} to="/" h="60px" w="100%">
      <Flex
        alignItems="center"
        justifyContent="center"
        borderBottom={"1px solid gray"}
        h="100%"
        w="100%"
      >
        <SvgSolaceSEToolkitLogo height={"80%"} />
      </Flex>
    </Link>
  );
}

const SidebarLink = props => {
  return <ReachLink getProps={getStyle} {...props} />;
};

// mutated beast that started with the pattern Ryan uses in the Reach Router Link docs
// should I be shot on sight or should they sing my names through the streets of
const getStyle = ({ isCurrent, href }) => {
  let icon = isCurrent
    ? icons[href].colored({ height: "80%" })
    : icons[href].gray({ height: "80%" });

  let borderLeft = isCurrent ? "5px solid #00AD93" : null;

  let backgroundColor = isCurrent
    ? theme.colors.brand.solaceLinkDarkActive
    : theme.colors.brand.solaceDark;

  return {
    style: {
      borderLeft: borderLeft,
      backgroundColor: backgroundColor
    },
    children: (
      <PseudoBox
        as={Flex}
        alignItems="center"
        justifyContent="center"
        h="60px"
        _hover={{ bg: theme.colors.brand.solaceLight }}
      >
        {icon}
      </PseudoBox>
    )
  };
};

export default Sidebar;
