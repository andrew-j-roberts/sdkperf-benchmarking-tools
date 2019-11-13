/**
 * pages/JobsDashboard.jsx
 */

import React, { useState } from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Grid,
  Stack,
  Text,
  Input,
  useTheme,
  PseudoBox,
  Icon
} from "@chakra-ui/core";

function JobsDashboard() {
  const [createFlowOpen, setCreateFlowOpen] = useState(false);
  return (
    <Box h="100%" fontFamily={"body"}>
      <Stack spacing={4}>
        <Header
          toggle={() => setCreateFlowOpen(!createFlowOpen)}
          isOpen={createFlowOpen}
        />
        <MainContent>
          {createFlowOpen ? (
            <Box bg="white" h="100%" w="100%">
              <CreationScreen />
            </Box>
          ) : (
            <JobCardsCollection cards={["1", "2", "3", "4"]} />
          )}
        </MainContent>
      </Stack>
    </Box>
  );
}

function Header({ toggle, isOpen, ...rest }) {
  const theme = useTheme();
  return (
    <Flex
      bg={theme.colors["brand"]["solaceLight"]}
      h={"60px"}
      w={"100%"}
      justifyContent="center"
      {...rest}
    >
      <Flex w={"100%"} maxW={1200} pl={"35px"} pr={"35px"}>
        <Flex alignItems={"center"} flex={1} minW={"400px"}>
          <Text
            fontFamily={"heading"}
            fontWeight={"normal"}
            fontSize={"28px"}
            color={"white"}
          >
            Benchmark Testing Jobs
          </Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"}>
          {isOpen ? (
            <Button
              border="none"
              _hover={{ bg: theme.colors["brand"]["solaceActive"] }}
              variant="solid"
              color={"white"}
              fontFamily={"heading"}
              onClick={toggle}
            >
              X
            </Button>
          ) : (
            <Button
              border="none"
              bg={theme.colors["brand"]["solaceGreen"]}
              _hover={{ bg: theme.colors["brand"]["solaceActive"] }}
              variant="solid"
              color={"white"}
              fontFamily={"heading"}
              onClick={toggle}
            >
              Create Job
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

function MainContent({ children, ...rest }) {
  return (
    <Flex {...rest}>
      <Flex w="100%" maxW="1200px" pl="30px" pr="30px" ml="auto" mr="auto">
        {children}
      </Flex>
    </Flex>
  );
}

function JobCard() {
  return (
    <PseudoBox
      _hover={{ transform: "translate(0px, -5px)" }}
      transition={"transform 0.2s ease, top 0.2s ease"}
    >
      <Grid
        w="363px"
        templateRows={"60px 60px 60px"}
        bg="white"
        boxShadow="0 0 3px #CCC"
        borderRadius="5px"
      >
        <Flex>Test</Flex>
        <Flex>Test</Flex>
        <Flex>Test</Flex>
      </Grid>
    </PseudoBox>
  );
}

function AddJobCard() {
  const theme = useTheme();
  return (
    <PseudoBox
      w="363px"
      h="180px"
      bg="white"
      color={theme.colors.brand.solaceGreen}
      boxShadow="0 0 3px #ccc"
      borderRadius="5px"
      _hover={{
        transform: "translate(0px, -5px)",
        color: theme.colors.brand.solaceActive
      }}
      transition={"transform 0.2s ease, top 0.2s ease"}
    >
      <Flex alignItems="center" justifyContent="center" w="100%" h="100%">
        <PseudoBox as={Icon} name="add" color="inherit" size="100px" />
      </Flex>
    </PseudoBox>
  );
}

function JobCardsCollection({ cards, addCard }) {
  const theme = useTheme();
  return (
    <Stack>
      <Box>
        <JobCardsCollectionHeader />
      </Box>
      <Box>
        <Flex flexWrap="wrap">
          {cards.map((card, key) => {
            return (
              <Box mt={4} mr={4}>
                <JobCard />
              </Box>
            );
          })}
          <Box mt={4}>
            <AddJobCard />
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
}

function JobCardsCollectionHeader() {
  return (
    <Flex
      w="100%"
      h="45px"
      alignItems="flex-end"
      borderBottom="solid"
      borderBottomWidth="1px"
      borderBottomColor="gray.600"
    >
      <Text
        as="h3"
        fontFamily={"heading"}
        fontWeight={"normal"}
        fontSize={"24px"}
      >
        6 Jobs
      </Text>
    </Flex>
  );
}

function CreationScreen() {
  const theme = useTheme();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value !== "Naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{
        ami: [],
        instanceType: [],
        vpcSecurityGroupId: [],
        subnetId: []
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Instance type</FormLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="name"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  width="50%"
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            border="none"
            bg={theme.colors["brand"]["solaceGreen"]}
            _hover={{ bg: theme.colors["brand"]["solaceActive"] }}
            variant="solid"
            color={"white"}
            fontFamily={"heading"}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}

function Row({ index, style }) {
  return <div style={style}>Row {index}</div>;
}

function Table() {
  return (
    <List height={150} itemCount={1000} itemSize={35} width={300}>
      {Row}
    </List>
  );
}

export default JobsDashboard;
