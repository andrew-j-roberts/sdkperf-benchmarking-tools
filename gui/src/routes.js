import React from "react";
import theme from "./theme";
import { JobsDashboard, ConfigurationDashboard } from "./pages";
import {
  SvgSDKPerfLogo,
  SvgSDKPerfLogoGray,
  SvgChartColored,
  SvgChartGray
} from "../public/svg-jsx";
import { Icon } from "@chakra-ui/core";

export default [
  {
    path: "/",
    name: "configuration-dashboard",
    component: ConfigurationDashboard
  },
  {
    path: "/jobs",
    name: "jobs-dashboard",
    component: JobsDashboard
  }
];

function ColoredCog(props) {
  return (
    <Icon
      color={theme.colors.brand.solaceGreen}
      name="settings"
      size={props.height ? props.height : props.width ? props.width : "50px"}
    />
  );
}

function GrayCog(props) {
  return (
    <Icon
      color={theme.colors.brand.solaceBgLight}
      name="settings"
      size={props.height ? props.height : props.width ? props.width : "50px"}
    />
  );
}

export const icons = {
  "/": {
    colored: ColoredCog,
    gray: GrayCog
  },
  "/jobs": {
    colored: SvgSDKPerfLogo,
    gray: SvgSDKPerfLogoGray
  },
  "/benchmarks": {
    colored: SvgChartColored,
    gray: SvgChartGray
  }
};
