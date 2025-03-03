import {
  Box,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'; //Extencion para iconos
import React from 'react';

export function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      mt="12"
      borderTop={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Stack
        px={{
          base: '2',
          md: '4',
        }}
      >
        <Stack
          direction="row"
          spacing="2"
          align="center"
          justify="space-between"
        >
        </Stack>
        <Text
          fontSize="xs"
          alignSelf={{
            base: 'center',
            sm: 'start',
          }}
        >
          &copy; {new Date().getFullYear()} Charm (Chakra-UI, React,{' '}
          <a href="https://meteor.com" target="_blank" rel="noreferrer">
            Meteor.js
          </a>
          ) by{' '}
          @Axel Nadir Ayala C.
          .
        </Text>
      </Stack>
    </Box>
  );
}
