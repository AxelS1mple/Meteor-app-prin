import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import  {Link as routerLink}  from "react-router-dom";
import { Logout } from './logout';
import { BottomNavigation } from './bottom-navigation';

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Button
            as={routerLink}
            to="/home"
            variant="link"
            bgGradient="linear(to-l, #675AAA, #4399E1)"
            bgClip="text"
            fontWeight="bold"
            fontFamily="heading"
            textAlign="left"
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            Tortilleria
          </Button>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Moon Icon' : 'Sun Icon'}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <BottomNavigation />
          <Logout />
        </Stack>
      </Flex>
    </Box>
  );
}
