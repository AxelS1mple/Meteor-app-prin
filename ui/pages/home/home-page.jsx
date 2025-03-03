import {
  Box,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { Suspense } from "react";
import { HomeCard } from "./components/home-card"; // Componente HomeCard independiente

export default function HomePage() {
  return (
    <>
      <Stack textAlign="center" spacing={{ base: 8 }} py={{ base: 10 }}>
        <Heading fontWeight={600}>
          <Text as="span" bgGradient="linear(to-l, #675AAA, #4399E1)" bgClip="text">
            Home
          </Text>
        </Heading>
      </Stack>

      {/* Contenedor de tarjetas alineadas y ocupando más espacio */}
      <HStack
        mt={8}
        wrap="wrap"
        spacing={6} // Reduce el espacio entre tarjetas
        justify="center"
        w="100%" // Ocupa todo el ancho
        maxW="1200px" // No se extiende demasiado en pantallas grandes
        mx="auto" // Centra el HStack en la pantalla
      >
        <HomeCard flex="1" minW="400px" maxW="500px" />
        <HomeCard flex="1" minW="400px" maxW="500px" />
        <HomeCard flex="1" minW="400px" maxW="500px" />
      </HStack>

      <Suspense fallback={<Spinner />}>
        <Box
          mt={8}
          py={{ base: 2 }}
          px={{ base: 4 }}
          pb={{ base: 4 }}
          border={0}
          borderStyle="solid"
          borderRadius="md"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <HStack mt={2}>
            <Box w="70%">
              <Text as="span" color={useColorModeValue("gray.600", "gray.400")} fontSize="xs">
                You stay at home
              </Text>
            </Box>
          </HStack>
        </Box>
      </Suspense>
    </>
  );
}
