/**
 * App.jsx
 */

import React from "react";
import { Router } from "@reach/router";
import { ColorModeProvider, ThemeProvider, Box, Stack } from "@chakra-ui/core";
import { CredentialsProvider } from "./CredentialsProvider";
import theme from "./theme";
import routes from "./routes";
import Sidebar from "./Sidebar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CredentialsProvider>
          <AppContainer>
            <Sidebar />
            <Box w="100%" h="100%">
              <Router>
                {routes.map((route, key) => {
                  return <route.component key={key} path={route.path} />;
                })}
              </Router>
            </Box>
          </AppContainer>
        </CredentialsProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

function AppContainer({ children }) {
  return (
    <Stack bg="gray.100" w="100vw" h="100vh" isInline>
      {children}
    </Stack>
  );
}

export default App;
