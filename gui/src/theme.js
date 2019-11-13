import React from "react";
import { theme } from "@chakra-ui/core";

const customColors = {
  brand: {
    solaceGreen: "#00AD93",
    solaceLight: "#474747",
    solaceDark: "#282828",
    solaceActive: "#33E0C6",
    solaceLinkDarkActive: "#0b0b0b",
    solaceBgLight: "#828282",
    solaceBgDark: "#444444"
  }
};

export default {
  ...theme,
  activeBorder: "5px solid #00AD93",
  colors: {
    ...theme.colors,
    ...customColors
  },
  fonts: {
    ...theme.fonts,
    heading: '"Roboto", sans-serif',
    body: '"Lato", sans-serif',
    mono: '"Roboto Mono", monospace'
  }
};
