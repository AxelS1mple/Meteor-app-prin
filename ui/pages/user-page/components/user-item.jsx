import {
  Box,
  Button,
  Checkbox,
  HStack,
  Stack,
  Tooltip,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { useUserItem } from '../hooks/use-user-item';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
};

export const UserItem = memo(({ user }) => {
  const { onDelete, onMarkAsDone, onUpdating } = useUserItem();
  const [newName, setNewName] = useState(user.name); // Estado para almacenar el nuevo nombre
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para manejar la visibilidad del modal

  const handleUpdate = () => {
    console.log('Updating user:', user._id, newName);
    onUpdating(user._id, newName);
    onClose(); // Cerrar el modal después de actualizar
  };

  return (
    <HStack mt={4}>
      <Box w="60%">
        <Checkbox
          colorScheme="green"
          isChecked={user.done}
          onChange={() => onMarkAsDone(user._id)}
        >
          <Tooltip label={`Added on ${new Date(user.createdAt).toLocaleString()}`} hasArrow>
            <span onClick={onOpen}> {/* Cuando el nombre es clickeado, se abre el modal */}
              {user.name}
            </span>
          </Tooltip>
        </Checkbox>
      </Box>
      <Stack w="40%" justify="flex-end" direction="row">
        <Button
          colorScheme="red"
          variant="outline"
          size="xs"
          onClick={() => onDelete(user._id)}
        >
          Remove
        </Button>
        <Button
          colorScheme="yellow"
          variant="outline"
          size="xs"
          onClick={onOpen} // También se puede abrir el modal desde el botón Update
        >
          Update
        </Button>
      </Stack>

      {/* Modal para editar el nombre */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              size="md"
              placeholder="Enter new name"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
});
