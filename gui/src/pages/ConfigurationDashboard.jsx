/**
 * pages/JobsDashboard.jsx
 */

import React, { useState } from "react";
import { Formik, Field } from "formik";
import { FixedSizeList as List } from "react-window";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Text,
  Input,
  useTheme,
  Heading
} from "@chakra-ui/core";
import { useCredentials } from "../CredentialsProvider";
import { SvgAmazonWebServicesLogo } from "../../public/svg-jsx";

function ConfigurationDaskboard() {
  const theme = useTheme();
  const { credentials, setCredentials } = useCredentials();
  const [modalState, setModalState] = useState("CLOSED");

  return (
    <Stack fontFamily={"body"} spacing={4}>
      <Header />
      <MainContent>
        <Heading size="l" color={theme.colors.brand.solaceBgDark}>
          Credentials
        </Heading>
        <AWSCredentialsForm />
      </MainContent>
    </Stack>
  );
}

function Header(props) {
  const theme = useTheme();
  return (
    <Flex
      bg={theme.colors["brand"]["solaceLight"]}
      h={"60px"}
      w={"100%"}
      justifyContent="center"
      {...props}
    >
      <Flex w={"100%"} maxW={1200} pl={"35px"} pr={"35px"}>
        <Flex alignItems={"center"} flex={1} minW={"400px"}>
          <Text
            fontFamily={"heading"}
            fontWeight={"normal"}
            fontSize={"28px"}
            color={"white"}
          >
            Settings
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

function MainContent({ children, ...rest }) {
  return (
    <Stack
      w="100%"
      maxW="1200px"
      pl="30px"
      pr="30px"
      ml="auto"
      mr="auto"
      {...rest}
    >
      {children}
    </Stack>
  );
}

// trying to use partial function application more often.  want to learn with me?
// https://dev.to/ycmjason/how-to-make-functions-partially-applicable-in-javascript--416b
const validateString = name => value => (!value ? `${name} is required` : null);

function AWSCredentialsForm() {
  const theme = useTheme();
  const { credentials, setCredentials } = useCredentials();

  return (
    <Stack bg="white" h="100%" w="100%" p="30px" spacing={4}>
      <Box>
        <SvgAmazonWebServicesLogo width="100px" />
      </Box>
      <Formik
        initialValues={{
          accessKey: credentials.accessKey,
          secretKey: credentials.secretKey,
          region: credentials.region
          //sshKeyName: ""
        }}
        onSubmit={(values, actions) => {
          setCredentials({ ...credentials, ...values });
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Stack spacing={4}>
              <Box>
                <Field name="accessKey" validate={validateString("Access key")}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.accessKey && form.touched.accessKey
                      }
                    >
                      <FormLabel htmlFor="name">Access key</FormLabel>
                      <Input
                        {...field}
                        id="accessKey"
                        placeholder="AWS_ACCESS_KEY_ID"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.500" }}
                      />
                      <FormErrorMessage>
                        {form.errors.accessKey}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Field name="secretKey" validate={validateString("Secret key")}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.secretKey && form.touched.secretKey
                      }
                    >
                      <FormLabel htmlFor="name">Secret key</FormLabel>
                      <Input
                        {...field}
                        id="secretKey"
                        placeholder="AWS_SECRET_ACCESS_KEY"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.500" }}
                      />
                      <FormErrorMessage>
                        {form.errors.secretKey}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Field name="region" validate={validateString("Region")}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.region && form.touched.region}
                    >
                      <FormLabel htmlFor="name">Default region</FormLabel>
                      <Input
                        {...field}
                        id="region"
                        placeholder="AWS_DEFAULT_REGION"
                        borderColor="gray.300"
                        _hover={{ borderColor: "gray.500" }}
                      />
                      <FormErrorMessage>{form.errors.region}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Flex justifyContent="flex-end">
                <Button
                  border="none"
                  bg={theme.colors["brand"]["solaceGreen"]}
                  _hover={{ bg: theme.colors["brand"]["solaceActive"] }}
                  variant="solid"
                  color={"white"}
                  fontFamily={"heading"}
                  isLoading={props.isSubmitting}
                  type="submit"
                  w="75px"
                >
                  Apply
                </Button>
              </Flex>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
}
export default ConfigurationDaskboard;
