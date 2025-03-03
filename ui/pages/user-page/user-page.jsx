import {
    Box,
    Button,
    HStack,
    Heading,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import React, { Suspense } from 'react';
  import { UserForm } from './components/user-form';
  import { UserItem } from './components/user-item';
  import { useUsers } from './hooks/use-user';
  import '/api/users/users.methods';
  
  export default function UsersPage() {
    const { hideDone, setHideDone, users, count } = useUsers();
    return (
      <>
        <Stack textAlign="center" spacing={{ base: 8 }} py={{ base: 10 }}>
          <Heading fontWeight={600}>
            <Text
              as="span"
              bgGradient="linear(to-l, #675AAA, #4399E1)"
              bgClip="text"
            >
              User dashboard
            </Text>
          </Heading>
        </Stack>
        <UserForm />
        <Suspense fallback={<Spinner />}>
          <Box
            mt={8}
            py={{ base: 2 }}
            px={{ base: 4 }}
            pb={{ base: 4 }}
            border={1}
            borderStyle="solid"
            borderRadius="md"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <HStack mt={2}>
              <Box w="70%">
                <Text
                  as="span"
                  color={useColorModeValue('gray.600', 'gray.400')}
                  fontSize="xs"
                >
                  You have {count} {count === 1 ? 'user ' : 'users '}
                </Text>
              </Box>
              <Stack w="30%" justify="flex-end" direction="row">
                <Button
                  bg="teal.600"
                  color="white"
                  colorScheme="teal"
                  size="xs"
                  onClick={() => setHideDone(!hideDone)}
                >
                    {hideDone ? 'Show All users' : 'Show Pending'}
                </Button>
              </Stack>
            </HStack>
            {users.map((user) => (
              <UserItem key={user._id} user={user} />
            ))}
          </Box>
        </Suspense>
      </>
    );
  }
  